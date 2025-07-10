
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    sessionId: DataTypes.STRING,
    tableId: DataTypes.STRING,
    historiqueCommandes: DataTypes.JSON,
    preferences: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: 'clients'
  });

  Client.associate = models => {
    Client.belongsTo(models.User, { foreignKey: 'id', as: 'user', onDelete: 'CASCADE' });
    Client.hasMany(models.Order, { foreignKey: 'clientId' });
    Client.hasOne(models.Panier, { foreignKey: 'clientId' });
  };

  return Client;
};
