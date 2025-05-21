const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const db = require('../db');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas (admin o cliente)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 */

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Endpoints para gestionar reservas
 */

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas (admin o cliente)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', verificarToken, reservasController.getReservas);

/**
 * @swagger
 * /reservas/mis-reservas:
 *   get:
 *     summary: Obtener reservas del usuario logueado
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del cliente
 */
router.get('/mis-reservas', verificarToken, reservasController.getMisReservas);

/**
 * @swagger
 * /reservas/estadisticas:
 *   get:
 *     summary: Ver estadísticas de reservas (admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos agregados de reservas
 */
router.get('/estadisticas', verificarToken, permitirRol('admin'), reservasController.getEstadisticas);

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una reserva (cliente)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *               numero_personas:
 *                 type: integer
 *               tatami_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', verificarToken, reservasController.createReserva);

/**
 * @swagger
 * /reservas/{id}/confirmar:
 *   put:
 *     summary: Confirmar una reserva (admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva confirmada
 */
router.put('/:id/confirmar', verificarToken, permitirRol('admin'), async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE reservas SET estado = 'confirmada' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ mensaje: 'Reserva confirmada', reserva: result.rows[0] });
  } catch (err) {
    console.error('Error al confirmar reserva:', err);
    res.status(500).json({ error: 'Error al confirmar reserva' });
  }
});

module.exports = router;
