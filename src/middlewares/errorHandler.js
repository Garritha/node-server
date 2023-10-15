function errorHandler(err, req, res, next) {
  if (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ocurrió un error en el servidor';

    return res.status(statusCode).json({ message });
  }

  next();
}

module.exports = errorHandler