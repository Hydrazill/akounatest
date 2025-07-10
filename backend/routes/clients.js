
const express = require('express');
const router = express.Router();
const { Client, User } = require('../models');
const { validateClient } = require('../middlewares/validators');

// CREATE
router.post('/', validateClient, async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    const clients = await Client.findAll({ include: 'user' });
    res.json(clients);
});

router.get('/:id', async (req, res) => {
    const client = await Client.findByPk(req.params.id, { include: 'user' });
    if (!client) return res.status(404).json({ error: 'Client non trouvé' });
    res.json(client);
});

// UPDATE
router.put('/:id', validateClient, async (req, res) => {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client non trouvé' });
    await client.update(req.body);
    res.json(client);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client non trouvé' });
    await client.destroy();
    res.json({ message: 'Client supprimé' });
});

module.exports = router;
