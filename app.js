require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
app.use(express.json());


// Conexion Database 

const uri = process.env.MONGODB_URI;
mongoose.connect(uri,{
 useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>{
  console.log('conexion exitosa a Data Base');
})
.catch((error) =>{
  console.error('error al conectar a Data base', error);
});
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
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');

app.use('/task', taskRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Middleware global para manejo de errores
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
