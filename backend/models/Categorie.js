
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        nom: DataTypes.STRING,
        description: DataTypes.STRING,
        restaurantId: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'categories'
    });

    Categorie.associate = models => {
        Categorie.hasMany(models.Plat, { foreignKey: 'categorieId' });
    };

    return Categorie;
};