// routes/tables.js
const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel'); // Importez le modèle Table
const auth = require('../middleware/auth'); // Importez le middleware d'authentification

// Middleware d'autorisation pour les gestionnaires (optionnel pour l'instant, mais bonne pratique)
function authorizeGestionnaire(req, res, next) {
  if (req.user && req.user.role === 'gestionnaire') {
    next();
  } else {
    res.status(403).json({ msg: 'Accès refusé. Seuls les gestionnaires peuvent effectuer cette action.' });
  }
}

// @route   GET /api/tables
// @desc    Récupérer toutes les tables
// @access  Public (ou Privé si seul le personnel doit voir les tables)
router.get('/', async (req, res) => {
  try {
    // Filtrer les tables par restaurantId si l'utilisateur est authentifié et que son rôle le permet
    let query = {};

    const tables = await Table.findAll({ where: query }); // Récupérer toutes les tables (ou filtrées)
    res.status(200).json(tables);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la récupération des tables.' });
  }
});

// @route   GET /api/tables/:id
// @desc    Récupérer une table par son ID
// @access  Public (ou Privé)
router.get('/:id', async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(404).json({ msg: 'Table non trouvée.' });
    }

    res.status(200).json(table);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la récupération de la table.' });
  }
});

// @route   POST /api/tables
// @desc    Créer une nouvelle table
// @access  Private (Gestionnaire) - Protégé par 'auth' et potentiellement 'authorizeGestionnaire'
router.post('/', auth, authorizeGestionnaire, async (req, res) => { 
  
  const { numero, capacite, restaurantId, qrCode, statutOccupee, dateOccupation } = req.body;

  // Validation basique
  if (!numero || !capacite || !restaurantId || !qrCode) {
    return res.status(400).json({ msg: 'Veuillez entrer tous les champs obligatoires: numero, capacite, restaurantId, qrCode.' });
  }

  try {
    // Optionnel : Vérifier si le restaurantId fourni correspond à celui de l'utilisateur authentifié
    if (req.user && req.user.restaurantId !== restaurantId) {
      return res.status(403).json({ msg: 'Vous ne pouvez créer des tables que pour votre propre restaurant.' });
    }

    // Vérifier si le numéro de table ou le QR code existe déjà pour ce restaurant
    const tableExists = await Table.findOne({
      where: { numero, restaurantId }
    });
    if (tableExists) {
      return res.status(409).json({ msg: 'Une table avec ce numéro existe déjà pour ce restaurant.' });
    }
    const qrCodeExists = await Table.findOne({
        where: { qrCode } // QR Code doit être unique globalement
    });
    if (qrCodeExists) {
        return res.status(409).json({ msg: 'Ce QR Code est déjà attribué à une autre table.' });
    }


    const newTable = await Table.create({
      numero,
      capacite,
      restaurantId,
      qrCode,
      statutOccupee: statutOccupee || false, // Par défaut à false si non fourni
      dateOccupation: dateOccupation || null, // Par défaut à null si non fourni
    });

    res.status(201).json(newTable);
  } catch (err) {
    console.error(err.message);
    // Gérer les erreurs de validation Sequelize (ex: unique constraint)
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ msg: 'Erreur de duplication: le numéro de table ou le QR code existe déjà.' });
    }
    res.status(500).json({ msg: 'Erreur Serveur lors de la création de la table.' });
  }
});



// @route   PUT /api/tables/:id
// @desc    Mettre à jour une table existante
// @access  Private (Gestionnaire)
router.put('/:id', auth, authorizeGestionnaire, async (req, res) => { // Ajoutez 'auth' pour protéger
  const { numero, capacite, restaurantId, qrCode, statutOccupee, dateOccupation } = req.body;

  try {
    let table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(404).json({ msg: 'Table non trouvée.' });
    }

    // Optionnel : Vérifier si la table appartient au restaurant de l'utilisateur authentifié
    if (req.user && table.restaurantId !== req.user.restaurantId) {
      return res.status(403).json({ msg: 'Accès refusé. Cette table n\'appartient pas à votre restaurant.' });
    }

    // Mettre à jour les champs
    table.numero = numero || table.numero;
    table.capacite = capacite || table.capacite;
    table.restaurantId = restaurantId || table.restaurantId; // Attention: modifier l'ID restaurant peut être risqué
    table.qrCode = qrCode || table.qrCode;
    table.statutOccupee = (statutOccupee !== undefined) ? statutOccupee : table.statutOccupee;

    // Gérer dateOccupation: Si statutOccupee devient true et dateOccupation est null, mettez la date actuelle
    // Si statutOccupee devient false, dateOccupation devrait être null
    if (statutOccupee === true && !table.dateOccupation) {
        table.dateOccupation = new Date();
    } else if (statutOccupee === false) {
        table.dateOccupation = null;
    } else {
        table.dateOccupation = dateOccupation || table.dateOccupation;
    }

    await table.save(); // Sauvegarder les modifications

    res.status(200).json(table);
  } catch (err) {
    console.error(err.message);
     if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ msg: 'Erreur de duplication: le numéro de table ou le QR code existe déjà.' });
    }
    res.status(500).json({ msg: 'Erreur Serveur lors de la mise à jour de la table.' });
  }
});

// @route   DELETE /api/tables/:id
// @desc    Supprimer une table
// @access  Private (Gestionnaire)
router.delete('/:id', auth, authorizeGestionnaire, async (req, res) => { // Ajoutez 'auth' pour protéger
  try {
    const table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(404).json({ msg: 'Table non trouvée.' });
    }

    // Optionnel : Vérifier si la table appartient au restaurant de l'utilisateur authentifié
    if (req.user && table.restaurantId !== req.user.restaurantId) {
      return res.status(403).json({ msg: 'Accès refusé. Cette table n\'appartient pas à votre restaurant.' });
    }

    await table.destroy(); // Supprimer la table

    res.status(200).json({ msg: 'Table supprimée avec succès.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erreur Serveur lors de la suppression de la table.' });
  }
});

module.exports = router;