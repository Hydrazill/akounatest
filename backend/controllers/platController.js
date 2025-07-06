const Plat = require('../models/platModel');

// Controller pour créer un nouveau plat
exports.createPlat = async (req, res) => {
    try {
        const plat = new Plat(req.body);
        await plat.save();
        res.status(201).json({ message: 'Plat créé avec succès', plat });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du plat', error: error.message });
    }
};

// Controller pour récupérer tous les plats
exports.getAllPlats = async (req, res) => {
    try {
        const plats = await Plat.find();
        res.status(200).json(plats);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des plats', error: error.message });
    }
};

// Controller pour récupérer un plat par son ID
exports.getPlatById = async (req, res) => {
    try {
        const plat = await Plat.findById(req.params.id);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }
        res.status(200).json(plat);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du plat', error: error.message });
    }
}