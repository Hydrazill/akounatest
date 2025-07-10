
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        restaurantId: DataTypes.STRING,
        titre: DataTypes.STRING,
        description: DataTypes.STRING,
        statutActif: DataTypes.BOOLEAN,
        dateCreation: DataTypes.DATE,
        dateFin: DataTypes.DATE,
        versionVue: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'menus'
    });

    Menu.associate = models => {
        Menu.hasMany(models.Plat, { foreignKey: 'menuId' });
    };

    return Menu;
};