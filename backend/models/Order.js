
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        numero: DataTypes.STRING,
        clientId: DataTypes.STRING,
        tableId: DataTypes.STRING,
        menuId: DataTypes.STRING,
        sousTotal: DataTypes.DOUBLE,
        taxes: DataTypes.DOUBLE,
        total: DataTypes.DOUBLE,
        devise: DataTypes.STRING,
        statut: DataTypes.STRING,
        dateCreation: DataTypes.DATE,
        dateConfirmation: DataTypes.DATE,
        dateLivraison: DataTypes.DATE,
        commentaires: DataTypes.STRING,
        modeOrder: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'orders'
    });

    Order.associate = models => {
        Order.belongsTo(models.Client, { foreignKey: 'clientId' });
        Order.belongsTo(models.Table, { foreignKey: 'tableId' });
        Order.belongsTo(models.Menu, { foreignKey: 'menuId' });
    };

    return Order;
};
