const express = require('express');
const router = express.Router();
const userController = require('./userController'); // Importamos el controlador

// Ruta para crear un nuevo usuario
router.post('/register', userController.createUser);

module.exports = router;
