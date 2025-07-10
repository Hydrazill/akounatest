
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        numero: DataTypes.STRING,
        capacite: DataTypes.INTEGER,
        restaurantId: DataTypes.STRING,
        qrCode: DataTypes.STRING,
        statutOccupee: DataTypes.BOOLEAN,
        dateOccupation: DataTypes.DATE
    }, {
        timestamps: false,
        tableName: 'tables'
    });

    Table.associate = models => {
        Table.hasMany(models.Order, { foreignKey: 'tableId' });
        Table.hasMany(models.Panier, { foreignKey: 'tableId' });
    };

    return Table;
};
