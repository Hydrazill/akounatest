
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,15}$/;

exports.validateUser = (req, res, next) => {
    const { name, email, phone, password } = req.body;

    if (!name || name.length < 2) return res.status(400).json({ error: 'name invalide' });
    if (!email || !emailRegex.test(email)) return res.status(400).json({ error: 'Email invalide' });
    if (!phone || !phoneRegex.test(phone)) return res.status(400).json({ error: 'Téléphone invalide' });
    if (!password || password.length < 6) return res.status(400).json({ error: 'Mot de passe trop court' });

    next();
};

exports.validateClient = (req, res, next) => {
    const { sessionId, tableId } = req.body;
    if (sessionId && typeof sessionId !== 'string') return res.status(400).json({ error: 'sessionId invalide' });
    if (tableId && typeof tableId !== 'string') return res.status(400).json({ error: 'tableId invalide' });

    next();
};

exports.validateManager = (req, res, next) => {
    const { restaurantId, role } = req.body;
    if (!restaurantId || typeof restaurantId !== 'string') return res.status(400).json({ error: 'restaurantId invalide' });
    if (!role || typeof role !== 'string') return res.status(400).json({ error: 'Role invalide' });

    next();
};
