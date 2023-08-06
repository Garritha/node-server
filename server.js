const express = require('express');
const app = express();
const port = 8080;
// Middleware a nivel de aplicación para gestionar métodos HTTP no válidos
app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  next(); // Si el método es válido, pasa al siguiente middleware o ruta
});

const tasksRouter = require('./list-view-router');
const tasksApp = require('./app');
const listEditRouter = require('./list-edit-router');

app.use(express.json());
app.use('/task', tasksRouter);
app.use('/crear', listEditRouter);



app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});