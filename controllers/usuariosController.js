const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/usuariosModels');

// Registrar usuario
exports.registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await authModel.crearUsuario(nombre, email, hashedPassword, rol || 'cliente');
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  // 👇 Aquí ves qué datos están llegando desde el frontend
  console.log("📩 Datos recibidos en login:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const result = await authModel.buscarUsuarioPorEmail(email);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_neko',
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Ver perfil desde base de datos
exports.perfil = async (req, res) => {
  try {
    const result = await authModel.obtenerPerfilPorId(req.user.id);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Ver perfil desde JWT si ya viene en el middleware
exports.verPerfil = (req, res) => {
  try {
    const { id, nombre, email, rol } = req.user;
    res.json({ id, nombre, email, rol });
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
};
