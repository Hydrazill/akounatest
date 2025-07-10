
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    motDePasse: DataTypes.STRING,
    dateCreation: DataTypes.DATE,
    dernierAcces: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.motDePasse) {
          const salt = await bcrypt.genSalt(10);
          user.motDePasse = await bcrypt.hash(user.motDePasse, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('motDePasse')) {
          const salt = await bcrypt.genSalt(10);
          user.motDePasse = await bcrypt.hash(user.motDePasse, salt);
        }
      }
    }
  });

  return User;
};
