const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para el cifrado de contraseñas
const User = require('../models/User'); // Suponiendo que tienes un modelo de usuario
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Ruta para enviar una solicitud de restablecimiento de contraseña
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    // Verificar si el usuario con este correo electrónico existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un token de restablecimiento de contraseña (puedes usar paquetes como `jsonwebtoken`)
    const resetToken = generateResetToken();

    // Guardar el token en la base de datos junto con su fecha de expiración
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Caduca en 1 hora
    await user.save();

    // Enviar un correo electrónico al usuario con el token (puedes usar paquetes como `nodemailer`)
    sendResetEmail(user.email, resetToken);

    return res.status(200).json({ message: 'Solicitud de restablecimiento de contraseña enviada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Lógica para restablecer la contraseña
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verificar si el token es válido y no ha expirado
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token no válido o ha expirado' });
    }

    // Cifrar la nueva contraseña y guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Función para generar un token de restablecimiento (puedes usar paquetes como `jsonwebtoken`)
function generateResetToken() {
    const token = crypto.randomBytes(20).toString('hex'); // Genera un token aleatorio de 20 bytes
    return token;
  }

// Función para enviar un correo electrónico con el token (puedes usar paquetes como `nodemailer`)
function sendResetEmail(email, token) {
    // Configura el transporte de nodemailer (debes configurar esto según tu proveedor de correo)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Proveedor de correo (puedes cambiarlo)
      auth: {
        user: 'tu_correo@gmail.com', // Tu dirección de correo
        pass: 'tu_contraseña', // Tu contraseña
      },
    });
  
    // Configura el mensaje de correo
    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: email,
      subject: 'Solicitud de restablecimiento de contraseña',
      text: `Has solicitado restablecer tu contraseña. Utiliza este token para restablecerla: ${token}`,
    };
  
    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });
  }
  
  // Ejemplo de uso
  const email = 'correo_destino@example.com';
  const token = generateResetToken();
  
  // Envía el correo electrónico con el token
  sendResetEmail(email, token);

module.exports = router;
