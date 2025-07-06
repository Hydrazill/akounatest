require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
// const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


const connectDB = require('./db'); // Importation de la fonction de connexion à la base de données
connectDB(); // Connect to the database

const menuRoutes = require('./routes/menu');
const platRoutes = require('./routes/plats'); 
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/tables');
const userRoutes = require('./routes/users');


app.use('/api/menu', menuRoutes);
app.use('/api/plats', platRoutes); 
// app.use('/api/orders', orderRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/users', userRoutes);

//require('./sockets')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${PORT}`);
});
