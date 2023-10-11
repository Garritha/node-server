require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db'); // Importa la conexión a la base de datos desde db.js

app.use(express.json());

// Iniciar el servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
