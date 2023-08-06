const express = require('express');
const router = express.Router();

let tasks = require("./task.json");

// Middleware para gestionar parámetros incorrectos 
function validateParams(req, res, next) {
  const validParams = ['completadas', 'pendientes'];

  const parametro = req.params.parametro;

  if (!parametro || !validParams.includes(parametro)) {
    return res.status(400).json({ message: 'Parámetro no válido' });
  }

  next(); // Si el parámetro es válido, pasa al siguiente middleware o ruta
}

// Ruta para obtener todas las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// Ruta para obtener las tareas filtradas por estado (completadas o pendientes)
router.get('/:parametro', validateParams, (req, res) => {
  const parametro = req.params.parametro;
  const tareasFiltradas = tasks.filter(tarea => tarea.estado === parametro);
  res.json(tareasFiltradas);
});

module.exports = router;
