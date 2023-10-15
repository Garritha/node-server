const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id, email }, secret, { expiresIn: '1h' });

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
}

module.exports = {
  loginUser,
};
