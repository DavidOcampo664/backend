const db = require('../db');

exports.obtenerTodos = () => {
  return db.query('SELECT * FROM tatamis');
};

exports.obtenerDisponibles = (fecha, hora, personas) => {
  return db.query(
    `
    SELECT * FROM tatamis
    WHERE capacidad >= $1
      AND id NOT IN (
        SELECT tatami_id FROM reservas
        WHERE fecha = $2 AND hora = $3 AND estado != 'cancelada'
      )
    `,
    [personas, fecha, hora]
  );
};

exports.crear = (nombre, capacidad) => {
  return db.query(
    'INSERT INTO tatamis (nombre, capacidad) VALUES ($1, $2) RETURNING *',
    [nombre, capacidad]
  );
};

exports.eliminar = (id) => {
  return db.query('DELETE FROM tatamis WHERE id = $1 RETURNING *', [id]);
};
