const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');




// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  try {
    // Busca un usuario con el correo electrónico proporcionado
    const user = await User.findOne({ mail });

    if (!user) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verifica si la contraseña coincide
    if (password !== user.password) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Genera un token JWT si las credenciales son válidas
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ mail }, secret, { expiresIn: '1h' });

    console.log('Token:', token);

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

module.exports = router;