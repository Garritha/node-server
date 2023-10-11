const mongoose = require('mongoose');

// URI de conexión a la base de datos
const uri = process.env.MONGODB_URI;

// Conectar a la base de datos
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error al conectar a la base de datos:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

module.exports = db;
