// initialisation MONGODB, excécution des requêtes

const mongoose = require('mongoose');
require('dotenv').config(); // Chargement des variables d'environnement
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/akunatest';

// Connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true, // Utilisation du nouveau parseur d'URL
            useUnifiedTopology: true, // Utilisation du nouveau moteur de topologie unifiée
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1); // Arrêt du processus en cas d'échec de connexion
    }
}

module.exports = connectDB; // Exportation de la fonction pour l'utiliser dans d'autres fichiers