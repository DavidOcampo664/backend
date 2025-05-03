const tatamisModel = require('../models/tatamisModel');

exports.getTatamis = async (req, res) => {
  try {
    const result = await tatamisModel.obtenerTodos();
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
    const result = await tatamisModel.obtenerDisponibles(fecha, hora, personas);
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
    const result = await tatamisModel.crear(nombre, capacidad);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el tatami' });
  }
};

exports.eliminarTatami = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await tatamisModel.eliminar(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tatami no encontrado' });
    }

    res.json({ mensaje: 'Tatami eliminado correctamente', tatami: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el tatami' });
  }
};
