
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    restaurantId: DataTypes.STRING,
    role: DataTypes.STRING,
    permissions: DataTypes.JSON,
    notifications: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: 'managers'
  });

  Manager.associate = models => {
    Manager.belongsTo(models.User, { foreignKey: 'id', as: 'user', onDelete: 'CASCADE' });
  };

  return Manager;
};
