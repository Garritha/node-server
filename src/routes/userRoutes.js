const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa el controlador

// Ruta para crear un nuevo usuario
router.post('/create-user', userController.createUser);
 // Llama a la función createUser del controlador

// Rutas para el restablecimiento de contraseña
router.post('/forgot-password', userController.sendPasswordResetEmail); // Llama a la función sendPasswordResetEmail del controlador
router.post('/reset-password/:token', userController.resetPassword); // Llama a la función resetPassword del controlador

module.exports = router;
