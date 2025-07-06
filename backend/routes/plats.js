const express = require('express'); 
const router = express.Router();
const platController = require('../controllers/platController');

// Route pour créer un nouveau plat
// POST /api/plats

router.post('/', platController.createPlat);

// Route pour récupérer tous les plats
// GET /api/plats

router.get('/', platController.getAllPlats);

module.exports = router;