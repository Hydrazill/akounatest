// models/Table.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  capacite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  statutOccupee: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dateOccupation: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  // Options du modèle
  tableName: 'tables', 
  timestamps: true,
});

module.exports = Table;