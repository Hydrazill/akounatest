const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importez l'instance Sequelize

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateHeureReservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duree: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 90, 
  },
  nombrePersonnes: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1 
    }
  },
  statut: { 
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en attente',
    validate: {
      isIn: [['confirmée', 'en attente', 'annulée', 'terminée']], 
    },
  },
  notesSpeciales: { 
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'reservations',
  timestamps: true,
});

module.exports = Reservation;