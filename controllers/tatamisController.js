const db = require('../db');

exports.getTatamis = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tatamis');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tatamis' });
  }
};

exports.getTatamisDisponibles = async (req, res) => {
  const { fecha, hora, personas } = req.query;

  if (!fecha || !hora || !personas) {
    return res.status(400).json({ error: 'Faltan parámetros: fecha, hora y personas' });
  }

  try {
    const result = await db.query(
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

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar disponibilidad' });
  }
};

exports.createTatami = async (req, res) => {
  const { nombre, capacidad } = req.body;
  if (!nombre || !capacidad) {
    return res.status(400).json({ error: 'Faltan datos: nombre o capacidad' });
  }

  try {
    const result = await db.query(
      'INSERT INTO tatamis (nombre, capacidad) VALUES ($1, $2) RETURNING *',
      [nombre, capacidad]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el tatami' });
  }
};

exports.eliminarTatami = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM tatamis WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tatami no encontrado' });
    }
    res.json({ mensaje: 'Tatami eliminado correctamente', tatami: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el tatami' });
  }
};
