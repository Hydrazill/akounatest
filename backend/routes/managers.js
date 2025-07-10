
const express = require('express');
const router = express.Router();
const { Manager, User } = require('../models');
const { validateManager } = require('../middlewares/validators');

// CREATE
router.post('/', validateManager, async (req, res) => {
    try {
        const manager = await Manager.create(req.body);
        res.status(201).json(manager);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    const managers = await Manager.findAll({ include: 'user' });
    res.json(managers);
});

router.get('/:id', async (req, res) => {
    const manager = await Manager.findByPk(req.params.id, { include: 'user' });
    if (!manager) return res.status(404).json({ error: 'Manager non trouvé' });
    res.json(manager);
});

// UPDATE
router.put('/:id', validateManager, async (req, res) => {
    const manager = await Manager.findByPk(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Manager non trouvé' });
    await manager.update(req.body);
    res.json(manager);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const manager = await Manager.findByPk(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Manager non trouvé' });
    await manager.destroy();
    res.json({ message: 'Manager supprimé' });
});

module.exports = router;
