const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);

// Rutas para el restablecimiento de contraseña
router.post('/forgot-password', userController.sendPasswordResetEmail);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
