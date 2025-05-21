const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');

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
 *     summary: Registrar un nuevo usuario (cliente)
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
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/registro', usuariosController.registrarUsuario);

/**
 * @swagger
 * /usuarios/registro/admin:
 *   post:
 *     summary: Registrar un nuevo administrador (solo accesible por admins)
 *     tags: [Usuarios]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador registrado
 *       403:
 *         description: Acceso denegado
 */
router.post(
  '/registro/admin',
  verificarToken,
  permitirRol('admin'),
  usuariosController.registrarAdmin
);

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
