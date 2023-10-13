const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');



// Función para iniciar sesión
async function loginUser(req, res) {
  const { email, password } = req.body;
console.log('email:', email, 'password:', password);
  try {
    // Busca un usuario con el correo electrónico proporcionado
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verifica si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  console.log('Credenciales inválidas');
  return res.status(401).json({ message: 'Credenciales inválidas' });
}

    // Genera un token JWT si las credenciales son válidas
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

    console.log('Token:', token);

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
}

module.exports = {
  loginUser,
};
