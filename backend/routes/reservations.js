const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const Reservation = require('../models/reservationModel');
const Client = require('../models/clientModel');
const Table = require('../models/tableModel');
const auth = require('../middleware/auth');


/**
 * Calcule l'heure de fin d'une réservation.
 * @param {Date} startTime - L'heure de début de la réservation.
 * @param {number} durationMinutes - La durée de la réservation en minutes.
 * @returns {Date} L'heure de fin calculée.
 */
function calculateReservationEndTime(startTime, durationMinutes) {
  return new Date(startTime.getTime() + durationMinutes * 60 * 1000);
}

/**
 * Vérifie si une table est disponible pour une nouvelle période de réservation.
 * @param {number} tableId - L'ID de la table à vérifier.
 * @param {string} dateHeureReservation - La date et l'heure de début de la nouvelle réservation (format ISO string).
 * @param {number} duree - La durée de la nouvelle réservation en minutes.
 * @param {number|null} [excludeReservationId=null] - L'ID d'une réservation à exclure du contrôle (utile lors de la mise à jour).
 * @returns {Promise<boolean>} True si la table est disponible, false sinon.
 */
async function checkTableAvailability(tableId, dateHeureReservation, duree, excludeReservationId = null) {
  const newReservationStart = new Date(dateHeureReservation);
  const newReservationEnd = calculateReservationEndTime(newReservationStart, duree);

  let whereConditions = {
    tableId: tableId,
    statut: {
      [Op.in]: ['confirmée', 'en attente']
    }
  };

  if (excludeReservationId) {
    whereConditions.id = { [Op.ne]: excludeReservationId };
  }

  const existingReservations = await Reservation.findAll({
    where: whereConditions
  });

  for (const existingRes of existingReservations) {
    const existingStart = new Date(existingRes.dateHeureReservation);
    const existingEnd = calculateReservationEndTime(existingStart, existingRes.duree);

    
    if (newReservationStart < existingEnd && newReservationEnd > existingStart) {
      return false;
    }
  }

  return true;
}

// --- Routes de l'API Réservations ---

// @route   POST /api/reservations
// @desc    Créer une nouvelle réservation (seul un client authentifié peut réserver pour lui-même)
// @access  Private (Client)
router.post('/', auth, async (req, res) => {
  const { clientId, tableId, dateHeureReservation, duree, nombrePersonnes, statut, notesSpeciales } = req.body;

  if (!req.user || req.user.type !== 'client') {
    return res.status(403).json({ msg: 'Accès refusé. Seuls les clients authentifiés peuvent créer une réservation.' });
  }

  if (req.user.id !== clientId) {
    return res.status(403).json({ msg: 'Accès refusé. Un client ne peut créer de réservation que pour lui-même.' });
  }

  if (!clientId || !tableId || !dateHeureReservation || !duree || !nombrePersonnes) {
    return res.status(400).json({ msg: 'Veuillez fournir clientId, tableId, dateHeureReservation, duree et nombrePersonnes.' });
  }
  if (typeof duree !== 'number' || duree <= 0) {
    return res.status(400).json({ msg: 'La durée doit être un nombre positif en minutes.' });
  }
  if (typeof nombrePersonnes !== 'number' || nombrePersonnes <= 0) {
    return res.status(400).json({ msg: 'Le nombre de personnes doit être un nombre positif.' });
  }
  if (isNaN(new Date(dateHeureReservation).getTime())) {
    return res.status(400).json({ msg: 'Le format de dateHeureReservation est invalide.' });
  }


  try {
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ msg: 'Client non trouvé.' });
    }

    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ msg: 'Table non trouvée.' });
    }

    if (nombrePersonnes > table.capacite) {
      return res.status(400).json({ msg: `Le nombre de personnes (${nombrePersonnes}) dépasse la capacité de la table (${table.capacite}).` });
    }

    const isTableAvailable = await checkTableAvailability(tableId, dateHeureReservation, duree);
    if (!isTableAvailable) {
      return res.status(409).json({ msg: 'La table n\'est pas disponible pour cette période. Conflit de réservation.' });
    }

    const newReservation = await Reservation.create({
      clientId,
      tableId,
      dateHeureReservation,
      duree,
      nombrePersonnes,
      statut: statut || 'en attente',
      notesSpeciales: notesSpeciales || null,
    });

    res.status(201).json(newReservation);
  } catch (err) {
    console.error('Erreur lors de la création de la réservation:', err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la création de la réservation.', error: err.message });
  }
});

// @route   GET /api/reservations
// @desc    Récupérer toutes les réservations (pour Gestionnaire/Serveur) ou les siennes (pour Client)
// @access  Private (Gestionnaire, Serveur, Client)
router.get('/', auth, async (req, res) => {
  try {
    let whereClause = {};
    const includes = [
      { model: Client, as: 'client', attributes: ['id', 'nom', 'email'] },
      { model: Table, as: 'table', attributes: ['id', 'numero', 'capacite', 'statutOccupee'] }
    ];

    if (!req.user) {
        return res.status(401).json({ msg: 'Non authentifié.' });
    }

    if (req.user.type === 'client') {
      whereClause.clientId = req.user.id; // Un client ne voit que ses propres réservations
    } else if (req.user.type === 'user') {
      // Un gestionnaire ou serveur voit toutes les réservations
      if (req.user.role !== 'gestionnaire' && req.user.role !== 'serveur') {
        return res.status(403).json({ msg: 'Accès refusé. Vous n\'êtes pas autorisé à voir toutes les réservations.' });
      }

    } else {
        return res.status(403).json({ msg: 'Type d\'utilisateur non reconnu.' });
    }

    const reservations = await Reservation.findAll({
      where: whereClause,
      include: includes,
      order: [['dateHeureReservation', 'ASC']]
    });

    res.status(200).json(reservations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réservations:', err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la récupération des réservations.', error: err.message });
  }
});

// @route   GET /api/reservations/:id
// @desc    Récupérer une réservation par son ID
// @access  Private (Gestionnaire, Serveur, ou Client pour sa propre réservation)
router.get('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: Client, as: 'client', attributes: ['id', 'nom', 'email'] },
        { model: Table, as: 'table', attributes: ['id', 'numero', 'capacite', 'statutOccupee'] }
      ]
    });

    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée.' });
    }

    if (!req.user) {
         return res.status(401).json({ msg: 'Non authentifié.' });
    }

    if (req.user.type === 'client') {
      if (req.user.id !== reservation.clientId) {
        return res.status(403).json({ msg: 'Accès refusé. Vous ne pouvez voir que vos propres réservations.' });
      }
    } else if (req.user.type === 'user') {
      if (req.user.role !== 'gestionnaire' && req.user.role !== 'serveur') {
        return res.status(403).json({ msg: 'Accès refusé. Vous n\'êtes pas autorisé à voir cette réservation.' });
      }
    } else {
        return res.status(403).json({ msg: 'Type d\'utilisateur non reconnu.' });
    }

    res.status(200).json(reservation);
  } catch (err) {
    console.error('Erreur lors de la récupération de la réservation:', err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la récupération de la réservation.', error: err.message });
  }
});

// @route   PUT /api/reservations/:id
// @desc    Mettre à jour une réservation existante
// @access  Private (Gestionnaire, Serveur, ou Client pour sa propre réservation - avec restrictions)
router.put('/:id', auth, async (req, res) => {
  const { clientId, tableId, dateHeureReservation, duree, nombrePersonnes, statut, notesSpeciales } = req.body;

  try {
    let reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée.' });
    }

    if (!req.user) {
        return res.status(401).json({ msg: 'Non authentifié.' });
    }

    if (req.user.type === 'client') {
      if (req.user.id !== reservation.clientId) {
        return res.status(403).json({ msg: 'Accès refusé. Vous ne pouvez modifier que vos propres réservations.' });
      }
      if (clientId && clientId !== reservation.clientId) {
        return res.status(403).json({ msg: 'Un client ne peut pas changer le client associé à une réservation.' });
      }
      if (tableId && tableId !== reservation.tableId) {
        return res.status(403).json({ msg: 'Un client ne peut pas changer la table associée à une réservation.' });
      }
      if (statut && !['en attente', 'annulée'].includes(statut)) {
         return res.status(403).json({ msg: 'Accès refusé. Un client ne peut que mettre la réservation "en attente" ou l\' "annuler".' });
      }
      if (dateHeureReservation === undefined && duree === undefined && nombrePersonnes === undefined && notesSpeciales === undefined && statut === undefined) {
        return res.status(400).json({ msg: 'Aucun champ valide fourni pour la mise à jour par le client.' });
      }
    } else if (req.user.type === 'user') {
      if (req.user.role !== 'gestionnaire' && req.user.role !== 'serveur') {
        return res.status(403).json({ msg: 'Accès refusé. Vous n\'êtes pas autorisé à modifier cette réservation.' });
      }
    } else {
        return res.status(403).json({ msg: 'Type d\'utilisateur non reconnu.' });
    }


    // Vérifier la disponibilité de la table si la date/heure/durée ou tableId changent
    const newTableId = tableId !== undefined ? tableId : reservation.tableId;
    const newDateHeure = dateHeureReservation !== undefined ? dateHeureReservation : reservation.dateHeureReservation;
    const newDuree = duree !== undefined ? duree : reservation.duree;
    const newNombrePersonnes = nombrePersonnes !== undefined ? nombrePersonnes : reservation.nombrePersonnes;

    if (newTableId !== reservation.tableId || new Date(newDateHeure).getTime() !== new Date(reservation.dateHeureReservation).getTime() || newDuree !== reservation.duree) {
      if (newTableId !== reservation.tableId) {
        const checkTable = await Table.findByPk(newTableId);
        if (!checkTable) {
          return res.status(404).json({ msg: 'La nouvelle table spécifiée n\'existe pas.' });
        }
      }

      const isTableAvailable = await checkTableAvailability(newTableId, newDateHeure, newDuree, reservation.id);
      if (!isTableAvailable) {
        return res.status(409).json({ msg: 'La table n\'est pas disponible pour les nouvelles dates/heures/durées. Conflit de réservation.' });
      }
    }

    // Vérifier la capacité de la nouvelle table (si modifiée)
    if (newNombrePersonnes !== reservation.nombrePersonnes || newTableId !== reservation.tableId) {
        const targetTable = (newTableId !== reservation.tableId) ? await Table.findByPk(newTableId) : reservation.table;
        if (!targetTable) {
            return res.status(404).json({ msg: 'Table cible non trouvée pour la vérification de capacité.' });
        }
        if (newNombrePersonnes > targetTable.capacite) {
            return res.status(400).json({ msg: `Le nombre de personnes (${newNombrePersonnes}) dépasse la capacité de la table (${targetTable.capacite}).` });
        }
    }


    if (req.user.type === 'user') {
        reservation.clientId = clientId !== undefined ? clientId : reservation.clientId;
        reservation.tableId = tableId !== undefined ? tableId : reservation.tableId;
        reservation.statut = statut !== undefined ? statut : reservation.statut;
    }

    reservation.dateHeureReservation = dateHeureReservation !== undefined ? dateHeureReservation : reservation.dateHeureReservation;
    reservation.duree = duree !== undefined ? duree : reservation.duree;
    reservation.nombrePersonnes = nombrePersonnes !== undefined ? nombrePersonnes : reservation.nombrePersonnes;
    reservation.notesSpeciales = notesSpeciales !== undefined ? notesSpeciales : reservation.notesSpeciales;


    await reservation.save(); // Sauvegarder les modifications

    res.status(200).json(reservation);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la réservation:', err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la mise à jour de la réservation.', error: err.message });
  }
});

// @route   DELETE /api/reservations/:id
// @desc    Supprimer une réservation (Gestionnaire, Serveur, ou Client pour sa propre réservation)
// @access  Private (Gestionnaire, Serveur, Client)
router.delete('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée.' });
    }

    if (!req.user) {
         return res.status(401).json({ msg: 'Non authentifié.' });
    }

    // Vérifier les permissions
    if (req.user.type === 'client') {
      if (req.user.id !== reservation.clientId) {
        return res.status(403).json({ msg: 'Accès refusé. Vous ne pouvez supprimer que vos propres réservations.' });
      }
    } else if (req.user.type === 'user') {
      if (req.user.role !== 'gestionnaire' && req.user.role !== 'serveur') {
        return res.status(403).json({ msg: 'Accès refusé. Vous n\'êtes pas autorisé à supprimer cette réservation.' });
      }
      // Optionnel: vérifier si la table appartient au restaurant de l'utilisateur si implémenté
    } else {
        return res.status(403).json({ msg: 'Type d\'utilisateur non reconnu.' });
    }

    await reservation.destroy(); // Supprimer la réservation

    res.status(200).json({ msg: 'Réservation supprimée avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la réservation:', err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la suppression de la réservation.', error: err.message });
  }
});

module.exports = router;