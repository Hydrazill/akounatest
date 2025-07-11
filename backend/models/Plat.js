
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Plat = sequelize.define('Plat', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        prix: DataTypes.DOUBLE,
        devise: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        ingredients: DataTypes.JSON,
        allergenes: DataTypes.JSON,
        valeurNutritionnelle: DataTypes.JSON,
        tempsPreparation: DataTypes.INTEGER,
        disponible: DataTypes.BOOLEAN,
        anecdotesCourtes: DataTypes.JSON,
        anecdotesCompletes: DataTypes.JSON,
        categorieId: DataTypes.STRING,
        menuId: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'plats'
    });
    
    Plat.associate = models => {
        Plat.belongsTo(models.Categorie, { foreignKey: 'categorieId' });
        Plat.belongsTo(models.Menu, { foreignKey: 'menuId' });
    };

    return Plat;
};