
const jwt = require("jsonwebtoken");


function handleError(res, errorMessage, statusCode) {
  console.error(errorMessage);
  return res.status(statusCode).send(errorMessage);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return handleError(res, "Acceso denegado. Se requiere un token.", 401);
  }

  try {
    const user = await verifyToken(token);
    req.user = user;
    console.log("Token verificado correctamente");
    next();
  } catch (err) {
    return handleError(res, "Token no válido o expirado.", 401);
  }
}

module.exports = {
  authenticateToken,
};
