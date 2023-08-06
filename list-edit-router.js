const express = require('express');
const router = express.Router();

let tasks = require("./task.json");

// Middleware para manejar errores de solicitudes POST y PUT
function errorHandler(req, res, next) {
  if (req.method === 'POST') {
    const { descripcion, estado } = req.body;

    if (!descripcion || !estado) {
      return res.status(400).json({ message: 'Falta descripción o estado de la tarea' });
    }
  }

  if (req.method === 'PUT') {
    const { descripcion, estado } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Cuerpo de la solicitud vacío' });
    }

    if (!descripcion || !estado) {
      return res.status(400).json({ message: 'Falta descripción o estado de la tarea' });
    }
  }

  next(); // Si no hay errores, pasa al siguiente middleware o ruta
}

// Agregar el middleware errorHandler a todas las rutas POST y PUT
router.post('/crear', errorHandler, (req, res) => {
  const { descripcion, estado } = req.body;

  const newTask = {
    id: tasks.length + 1,
    descripcion,
    estado
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

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

router.put('/actualizar/:id', errorHandler, (req, res) => {
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
