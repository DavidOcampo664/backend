const express = require('express');
const router = express.Router();
const tatamisController = require('../controllers/tatamisController');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Tatamis
 *   description: Endpoints para gestión de tatamis
 */

/**
 * @swagger
 * /tatamis:
 *   get:
 *     summary: Obtener todos los tatamis
 *     tags: [Tatamis]
 *     responses:
 *       200:
 *         description: Lista de tatamis
 */
router.get('/', tatamisController.getTatamis);

/**
 * @swagger
 * /tatamis:
 *   post:
 *     summary: Crear un nuevo tatami (admin)
 *     tags: [Tatamis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               capacidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tatami creado
 */
router.post('/', verificarToken, permitirRol('admin'), tatamisController.createTatami);

/**
 * @swagger
 * /tatamis/{id}:
 *   delete:
 *     summary: Eliminar un tatami (admin)
 *     tags: [Tatamis]
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
 *         description: Tatami eliminado
 */
router.delete('/:id', verificarToken, permitirRol('admin'), tatamisController.eliminarTatami);

/**
 * @swagger
 * /tatamis/disponibles:
 *   get:
 *     summary: Obtener tatamis disponibles para una fecha/hora
 *     tags: [Tatamis]
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: hora
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: personas
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tatamis disponibles
 */
router.get('/disponibles', tatamisController.getTatamisDisponibles);

module.exports = router;
