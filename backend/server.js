require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
// const { Server } = require('socket.io');

const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/tables');
const userRoutes = require('./routes/users');

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/users', userRoutes);

//require('./sockets')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${PORT}`);
});
