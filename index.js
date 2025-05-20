const express = require('express');
const app = express();
const cors = require('cors'); 
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Rutas
const tatamisRoutes = require('./routes/tatamisRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// ✅ No usamos /api/v1 aquí
app.use('/usuarios', usuariosRoutes);
app.use('/tatamis', tatamisRoutes); 
app.use('/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente - Neko Sushi');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Swagger
const swaggerSetup = require('./swagger');
swaggerSetup(app);
