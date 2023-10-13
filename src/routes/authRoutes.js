const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importamos el controlador

// Ruta para iniciar sesión
router.post('/login', authController.loginUser);

module.exports = router;
