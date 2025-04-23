const db = require('../db');

exports.getReservas = async (req, res) => {
  try {
    let result;
    if (req.user.rol === 'admin') {
      result = await db.query('SELECT * FROM reservas');
    } else {
      result = await db.query('SELECT * FROM reservas WHERE usuario_id = $1', [req.user.id]);
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};


exports.getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM reservas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

exports.createReserva = async (req, res) => {
  const { fecha, hora, numero_personas, tatami_id } = req.body;
  const usuario_id = req.user?.id;

  if (!fecha || !hora || !numero_personas || !tatami_id) {
    return res.status(400).json({ error: 'Faltan datos en la reserva' });
  }

  try {
    // Validación: ¿El tatami ya está reservado en esa fecha/hora?
    const conflicto = await db.query(
      `SELECT * FROM reservas
       WHERE tatami_id = $1 AND fecha = $2 AND hora = $3 AND estado != 'cancelada'`,
      [tatami_id, fecha, hora]
    );

    if (conflicto.rows.length > 0) {
      return res.status(409).json({ error: 'Tatami ya reservado en ese horario' });
    }

  // Verificar si la capacidad del tatami es suficiente
  const tatamiRes = await db.query('SELECT capacidad FROM tatamis WHERE id = $1', [tatami_id]);
  if (tatamiRes.rows.length === 0) {
    return res.status(404).json({ error: 'Tatami no encontrado' });
  }

  const capacidad = tatamiRes.rows[0].capacidad;
  if (numero_personas > capacidad) {
    return res.status(400).json({ error: `Este tatami tiene una capacidad máxima de ${capacidad} personas.` });
  }

    // Crear la reserva
    const result = await db.query(
      `INSERT INTO reservas (fecha, hora, numero_personas, tatami_id, usuario_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fecha, hora, numero_personas, tatami_id, usuario_id]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('🔴 Error en createReserva:', err);
res.status(500).json({ error: 'Error al crear reserva', detalle: err.message });
  }
};



exports.actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido. Usa pendiente, confirmada o cancelada.' });
  }

  try {
    const result = await db.query(
      'UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ mensaje: 'Estado actualizado correctamente', reserva: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el estado de la reserva' });
  }
};

exports.actualizarReservaCompleta = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, numero_personas, tatami_id, estado } = req.body;

  if (!fecha || !hora || !numero_personas || !tatami_id || !estado) {
    return res.status(400).json({ error: 'Faltan datos para actualizar la reserva' });
  }

  try {
    const result = await db.query(
      `UPDATE reservas 
       SET fecha = $1, hora = $2, numero_personas = $3, tatami_id = $4, estado = $5 
       WHERE id = $6 RETURNING *`,
      [fecha, hora, numero_personas, tatami_id, estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ mensaje: 'Reserva actualizada correctamente', reserva: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

exports.eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ mensaje: 'Reserva eliminada correctamente', reserva: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};

exports.getEstadisticas = async (req, res) => {
  try {
    const totalReservas = await db.query('SELECT COUNT(*) FROM reservas');
    const porEstado = await db.query(`
      SELECT estado, COUNT(*) 
      FROM reservas 
      GROUP BY estado
    `);
    const porTatami = await db.query(`
      SELECT t.nombre, COUNT(*) AS total
      FROM reservas r
      JOIN tatamis t ON r.tatami_id = t.id
      GROUP BY t.nombre
      ORDER BY total DESC
      LIMIT 5
    `);

    res.json({
      total_reservas: totalReservas.rows[0].count,
      resumen_por_estado: porEstado.rows,
      top_tatamis: porTatami.rows
    });
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

exports.getMisReservas = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY fecha DESC, hora DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener tus reservas:', err);
    res.status(500).json({ error: 'Error al obtener tus reservas' });
  }
};
