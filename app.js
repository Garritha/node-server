const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Middleware global para gestionar métodos HTTP no válidos
app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  next();
});

const errorHandler = require('./src/middlewares/errorHandler');
const taskRoutes = require('./src/routes/taskRoutes');

app.use('/task', taskRoutes);

// Middleware global para manejo de errores
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
