const express = require('express');
const router = express.Router();
const protectedController = require('../controllers/protectedController'); // Importamos el controlador

// Ruta protegida que verifica el token
router.get('/', protectedController.verifyToken);

module.exports = router;
