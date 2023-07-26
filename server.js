const express = require('express');
const app = express();
const port = 8080;

const tasksRouter = require('./list-view-router');
const tasksApp = require('./app');
const listEditRouter = require('./list-edit-router');

app.use(express.json());
app.use('/tareas', tasksRouter);
app.use('/crear', listEditRouter);



app.use((req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});