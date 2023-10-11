const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Puerto del servidor, utiliza el valor de PORT si está configurado en las variables de entorno

// Middleware para analizar JSON
app.use(express.json());

// Rutas y middleware
const errorHandler = require('./src/middlewares/errorHandler');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Importa las rutas de autenticación
const resetPasswordRoutes = require('./src/routes/resetPasswordRoutes'); // Importa las rutas de restablecimiento de contraseña
const createUserRoutes = require('./src/routes/createUserRoutes'); // Importa las rutas para la creación de usuarios
const protectedRoutes = require('./src/routes/protectedRoutes');

app.use('/task', taskRoutes);
app.use('/auth', authRoutes);
app.use('/reset-password', resetPasswordRoutes); // Usa la ruta para restablecimiento de contraseña
app.use('/create-user', createUserRoutes); // Usa la ruta para la creación de usuarios
app.use('/protected', protectedRoutes);

// Middleware global para gestionar métodos HTTP no válidos
app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods includes(req.method)) {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  next();
});

// Middleware global para manejo de errores
app.use(errorHandler);

// Página no encontrada (404)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
