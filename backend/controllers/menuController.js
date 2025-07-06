const Menu = require('../models/menuModel');

// Fonction pour créer un nouveau menu
exports.createMenu = async (req, res) => {
    try {
        const { restaurantId, date, titre, description, plats } = req.body;
        const newMenu = new Menu({
            restaurantId,
            date,
            titre,
            description,
            plats
        });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer tous les menus

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate('plats');
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer un menu par son ID
exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('plats');
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un menu
exports.updateMenu = async (req, res) => {
    try {
        const { titre, description, plats } = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id,
            { titre, description, plats },
            { new: true }
        ).populate('plats');
        
        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};