
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Panier = sequelize.define('Panier', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        tableId: DataTypes.STRING,
        clientId: DataTypes.STRING,
        total: DataTypes.DOUBLE,
        devise: DataTypes.STRING,
        dateCreation: DataTypes.DATE,
        dateModification: DataTypes.DATE,
        actif: DataTypes.BOOLEAN
    }, {
        timestamps: false,
        tableName: 'paniers'
    });

    Panier.associate = models => {
        Panier.belongsTo(models.Table, { foreignKey: 'tableId' });
        Panier.belongsTo(models.Client, { foreignKey: 'clientId' });
    };

    return Panier;
};