const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); 
require('dotenv').config();

app.use(express.json());

// Rutas actualizadas
const tatamisRoutes = require('./routes/tatamisRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/usuarios', usuariosRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente - Neko Sushi');
});

app.use('/tatamis', tatamisRoutes); 
app.use('/reservas', reservasRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const swaggerSetup = require('./swagger');
swaggerSetup(app);
