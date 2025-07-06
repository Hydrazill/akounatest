const mongoose = require('mongoose');

const platSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    prix: Number,
    devise: { type: String, default: 'XAF' },
    imageUrl: String,
    ingredients: [String],
    allergenes: [String],
    valeurNutritionnelle: {
        calories: Number,
        proteines: String,
        glucides: String,
        lipides: String,
    },
    tempsPreparation: Number, // en minutes
    disponible: { type: Boolean, default: true },
    anecdotes: [String],
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plat', platSchema);