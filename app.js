require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db'); // Importa la conexión a la base de datos desde db.js
const cors = require('cors');

app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
  origin: ' http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rutas y middleware
const errorHandler = require('./src/middlewares/errorHandler');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Agregamos las rutas
app.use('/task', taskRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/protected', protectedRoutes); 

// Middleware global para gestionar métodos HTTP no válidos
app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];

  if (!validMethods.includes(req.method)) {
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

// Iniciar el servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});