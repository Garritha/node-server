const jwt = require('jsonwebtoken');

// Función para verificar el token y autenticar al usuario
function verifyToken(req, res) {
  const token = req.headers.authorization;

  console.log('Token recibido:', token);

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    res.json({ message: `Usuario autenticado: ${decoded.username}` });
  } catch (error) {
    console.log('Token inválido:', error);
    res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = {
  verifyToken,
};
