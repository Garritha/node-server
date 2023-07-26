const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, descripcion: 'Sacar al perro', estado: 'pendiente' },
  { id: 2, descripcion: 'Hacer ejercicio', estado: 'completada' },
  { id: 3, descripcion: 'Hacer mercado', estado: 'completada' }
];

// Ruta para crear una nueva tarea
router.post('/crear', (req, res) => {
  const { descripcion, estado } = req.body;

  if (!descripcion || !estado) {
    res.status(400).json({ message: 'Falta descripción o estado de la tarea' });
  } else {
    const newTask = {
      id: tasks.length + 1,
      descripcion,
      estado
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// Ruta para eliminar una tarea
router.delete('/eliminar/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Ruta para actualizar una tarea existente
router.put('/actualizar/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { descripcion, estado } = req.body;

  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.descripcion = descripcion || task.descripcion;
    task.estado = estado || task.estado;

    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

module.exports = router;