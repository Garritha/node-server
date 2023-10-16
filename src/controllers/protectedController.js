// protectedController.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token válido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  verifyToken,
};