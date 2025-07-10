
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite'
});

const models = {};

// Charger tous les modèles
models.User = require('./User')(sequelize, DataTypes);
models.Client = require('./Client')(sequelize, DataTypes);
models.Manager = require('./Manager')(sequelize, DataTypes);

models.Table = require('./Table')(sequelize, DataTypes);

models.Order = require('./Order')(sequelize, DataTypes);

models.Menu = require('./Menu')(sequelize, DataTypes);
models.Panier = require('./Panier')(sequelize, DataTypes);
models.Plat = require('./Plat')(sequelize, DataTypes);
models.Categorie = require('./Categorie')(sequelize, DataTypes);

// Définir les associations après chargement
Object.values(models).forEach(model => {
    if (model.associate) model.associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
