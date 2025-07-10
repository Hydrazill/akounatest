
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { validateUser } = require('../middlewares/validators');

// CREATE
router.post('/', validateUser, async (req, res) => {
    try {
        const user = await User.create({ ...req.body, dateCreation: new Date(), dernierAcces: null });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
});

// UPDATE
router.put('/:id', validateUser, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.update(req.body);
    res.json(user);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé' });
});

module.exports = router;