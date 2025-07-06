const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    restaurantId: { type: String, required: true },
    date: { type: Date, required: true },
    titre: { type: String, required: true },
    description: { type: String },
    statutActif: { type: Boolean, default: true },
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plat' }],  // relation entre Menu et Plat
    versionWeb: { type: Boolean, default: false },
    dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Menu', menuSchema);