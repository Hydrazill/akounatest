
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,15}$/;

exports.validateUser = (req, res, next) => {
    const { id, nom, email, telephone, motDePasse } = req.body;

    if (!nom || nom.length < 2) return res.status(400).json({ error: 'Nom invalide' });
    if (!email || !emailRegex.test(email)) return res.status(400).json({ error: 'Email invalide' });
    if (!telephone || !phoneRegex.test(telephone)) return res.status(400).json({ error: 'Téléphone invalide' });
    if (!motDePasse || motDePasse.length < 6) return res.status(400).json({ error: 'Mot de passe trop court' });

    next();
};

exports.validateClient = (req, res, next) => {
    const { sessionId, tableId } = req.body;
    if (!sessionId || typeof sessionId !== 'string') return res.status(400).json({ error: 'sessionId invalide' });
    if (!tableId || typeof tableId !== 'string') return res.status(400).json({ error: 'tableId invalide' });

    next();
};

exports.validateManager = (req, res, next) => {
    const { restaurantId, role } = req.body;
    if (!restaurantId || typeof restaurantId !== 'string') return res.status(400).json({ error: 'restaurantId invalide' });
    if (!role || typeof role !== 'string') return res.status(400).json({ error: 'Role invalide' });

    next();
};
