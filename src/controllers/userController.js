const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

// Función para crear un nuevo usuario
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'La contraseña no cumple con los requisitos' });
    }

    // Cifrar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, secret, { expiresIn: '1h' });

    return res.status(201).json({ message: 'Usuario creado con éxito', token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


// Función para enviar una solicitud de restablecimiento de contraseña
async function sendPasswordResetEmail(req, res) {
  try {
    const { email } = req.body;

    // Verifica si el usuario con este correo electrónico existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token de restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Guarda el token en la base de datos junto con su fecha de expiración
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Caduca en 1 hora
    await user.save();

    // Envía un correo electrónico al usuario con el token
    sendResetEmail(user.email, resetToken);

    return res.status(200).json({ message: 'Solicitud de restablecimiento de contraseña enviada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Función para restablecer la contraseña
async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verifica si el token es válido y no ha expirado
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token no válido o ha expirado' });
    }

    // Cifra la nueva contraseña y guárdala en la base de datos
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
}

// Función para enviar un correo electrónico con el token
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

module.exports = {
  createUser,
  sendPasswordResetEmail,
  resetPassword,
};
