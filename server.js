const express = require('express');
const app = express();
const port = 8080;

app.get('/tareas', (req, res) => {
  const tareas = [
    { id: 1, descripcion: 'Sacar al perro', estado: 'pendiente' },
    { id: 2, descripcion: 'Hacer ejercicio', estado: 'completada' },
    { id: 3, descripcion: 'Hacer mercado', estado: 'completada' }
  ];

  res.json(tareas);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
