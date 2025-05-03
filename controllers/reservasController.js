const reservasModel = require('../models/reservasModel');

exports.getReservas = async (req, res) => {
  try {
    const result = await reservasModel.obtenerTodas(req.user);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

exports.getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reservasModel.obtenerPorId(id);
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
    const conflicto = await reservasModel.verificarConflicto(tatami_id, fecha, hora);
    if (conflicto.rows.length > 0) {
      return res.status(409).json({ error: 'Tatami ya reservado en ese horario' });
    }

    const tatamiRes = await reservasModel.capacidadTatami(tatami_id);
    if (tatamiRes.rows.length === 0) {
      return res.status(404).json({ error: 'Tatami no encontrado' });
    }

    const capacidad = tatamiRes.rows[0].capacidad;
    if (numero_personas > capacidad) {
      return res.status(400).json({ error: `Este tatami tiene una capacidad máxima de ${capacidad} personas.` });
    }

    const result = await reservasModel.crear(fecha, hora, numero_personas, tatami_id, usuario_id);
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
    const result = await reservasModel.actualizarEstado(estado, id);
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
    const result = await reservasModel.actualizarCompleta(fecha, hora, numero_personas, tatami_id, estado, id);
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
    const result = await reservasModel.eliminar(id);
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
    const datos = await reservasModel.estadisticas();
    res.json({
      total_reservas: datos.total,
      resumen_por_estado: datos.porEstado,
      top_tatamis: datos.porTatami
    });
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

exports.getMisReservas = async (req, res) => {
  try {
    const result = await reservasModel.obtenerPorUsuario(req.user.id);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener tus reservas:', err);
    res.status(500).json({ error: 'Error al obtener tus reservas' });
  }
};
