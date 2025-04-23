const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para registro e inicio de sesión
 */

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [cliente, admin]
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/registro', usuariosController.registrar);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión y obtener token
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcto con token
 */
router.post('/login', usuariosController.login);

const { verificarToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /usuarios/perfil:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del perfil del usuario
 */
router.get('/perfil', verificarToken, usuariosController.verPerfil);

module.exports = router;
