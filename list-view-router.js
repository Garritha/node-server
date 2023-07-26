const express = require('express');
const router = express.Router();

const tasks = [
  { id: 1, descripcion: 'Sacar al perro', estado: 'pendiente' },
  { id: 2, descripcion: 'Hacer ejercicio', estado: 'completada' },
  { id: 3, descripcion: 'Hacer mercado', estado: 'completada' }
];

// Ruta para obtener todas las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// Ruta para obtener las tareas completadas
router.get('/completadas', (req, res) => {
  const tareasCompletadas = tasks.filter(tarea => tarea.estado === 'completada');
  res.json(tareasCompletadas);
});

// Ruta para obtener las tareas pendientes (incompletas)
router.get('/pendientes', (req, res) => {
  const tareasPendientes = tasks.filter(tarea => tarea.estado === 'pendiente');
  res.json(tareasPendientes);
});

module.exports = router;