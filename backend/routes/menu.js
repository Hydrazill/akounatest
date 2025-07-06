const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route pour créer un nouveau menu
// POST /api/menus

router.post('/', menuController.createMenu);

// Route pour récupérer tous les menus
// GET /api/menus

router.get('/', menuController.getAllMenus);

// Route pour récupérer un menu par son ID
// GET /api/menus/:id

router.get('/:id', menuController.getMenuById);

// Route pour mettre à jour un menu
// PUT /api/menus/:id

router.put('/:id', menuController.updateMenu);

module.exports = router;