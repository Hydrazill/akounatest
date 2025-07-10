require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
// const { Server } = require('socket.io');

const models = require('./models');
const menuRoutes = require('./routes/menus');
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/tables');
const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const managerRoutes = require('./routes/managers');

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/tables', tableRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/managers', managerRoutes);

//require('./sockets')(io);

models.sequelize.sync({ force: false })
  .then(() => {
    console.log('Tables créées ou mises à jour.');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server ready on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Erreur lors de la synchronisation Sequelize :', err));
