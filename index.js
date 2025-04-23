const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());

// Rutas actualizadas
const tatamisRoutes = require('./routes/tatamisRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente - Neko Sushi');
});

app.use('/tatamis', tatamisRoutes); // antes era /mesas
app.use('/reservas', reservasRoutes);

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

const swaggerSetup = require('./swagger');
swaggerSetup(app);
