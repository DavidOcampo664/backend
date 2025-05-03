const db = require('../db');

exports.crearUsuario = (nombre, email, hashedPassword, rol) => {
  return db.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
    [nombre, email, hashedPassword, rol]
  );
};

exports.buscarUsuarioPorEmail = (email) => {
  return db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
};

exports.obtenerPerfilPorId = (id) => {
  return db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [id]);
};

