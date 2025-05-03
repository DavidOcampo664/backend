const db = require('../db');

exports.obtenerTodas = async (usuario) => {
  if (usuario.rol === 'admin') {
    return db.query('SELECT * FROM reservas');
  } else {
    return db.query('SELECT * FROM reservas WHERE usuario_id = $1', [usuario.id]);
  }
};

exports.obtenerPorId = (id) => {
  return db.query('SELECT * FROM reservas WHERE id = $1', [id]);
};

exports.crear = (fecha, hora, numero_personas, tatami_id, usuario_id) => {
  return db.query(
    `INSERT INTO reservas (fecha, hora, numero_personas, tatami_id, usuario_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [fecha, hora, numero_personas, tatami_id, usuario_id]
  );
};

exports.verificarConflicto = (tatami_id, fecha, hora) => {
  return db.query(
    `SELECT * FROM reservas
     WHERE tatami_id = $1 AND fecha = $2 AND hora = $3 AND estado != 'cancelada'`,
    [tatami_id, fecha, hora]
  );
};

exports.capacidadTatami = (tatami_id) => {
  return db.query('SELECT capacidad FROM tatamis WHERE id = $1', [tatami_id]);
};

exports.actualizarEstado = (estado, id) => {
  return db.query('UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING *', [estado, id]);
};

exports.actualizarCompleta = (fecha, hora, numero_personas, tatami_id, estado, id) => {
  return db.query(
    `UPDATE reservas 
     SET fecha = $1, hora = $2, numero_personas = $3, tatami_id = $4, estado = $5 
     WHERE id = $6 RETURNING *`,
    [fecha, hora, numero_personas, tatami_id, estado, id]
  );
};

exports.eliminar = (id) => {
  return db.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);
};

exports.estadisticas = async () => {
  const total = await db.query('SELECT COUNT(*) FROM reservas');
  const porEstado = await db.query('SELECT estado, COUNT(*) FROM reservas GROUP BY estado');
  const porTatami = await db.query(`
    SELECT t.nombre, COUNT(*) AS total
    FROM reservas r
    JOIN tatamis t ON r.tatami_id = t.id
    GROUP BY t.nombre
    ORDER BY total DESC
    LIMIT 5
  `);
  return { total: total.rows[0].count, porEstado: porEstado.rows, porTatami: porTatami.rows };
};

exports.obtenerPorUsuario = (usuario_id) => {
  return db.query(
    `SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY fecha DESC, hora DESC`,
    [usuario_id]
  );
};
