function validateParams(req, res, next) {
  const validParams = ['completadas', 'pendientes'];
  const parametro = req.params.parametro;

  if (!parametro || !validParams.includes(parametro)) {
    return res.status(400).json({ message: 'Parámetro no válido' });
  }

  next();
}

module.exports = validateParams;
