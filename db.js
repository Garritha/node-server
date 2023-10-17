import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// URI de conexión a la base de datos
const uri = process.env.MONGODB_URI;

// Opciones de configuración para la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conectar a la base de datos
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error al conectar a la base de datos:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

mongoose.connect(uri, options);

export default db;
