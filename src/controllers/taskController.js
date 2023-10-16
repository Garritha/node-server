const Task = require('../models/Schema');
const mongoose = require('mongoose');


async function createTask(req, res) {
  try {
    const { descripcion, titulo, userId } = req.body;
    const token = req.headers.authorization;
    

    // Crear una nueva tarea asociada al usuario
    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      usuario: userId, // Asociar la tarea con el identificador único del usuario
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
  }
}
async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { titulo, descripcion, estado } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (task.usuario.toString() !== req.user._id) {
      return res.status(403).json({ message: 'No tienes permiso para modificar esta tarea' });
    }

    if (titulo !== undefined) {
      task.titulo = titulo;
    }
    if (descripcion !== undefined) {
      task.descripcion = descripcion;
    }
    if (estado !== undefined) {
      task.estado = estado;
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
}

// Eliminación de una tarea
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (task.usuario.toString() !== req.user._id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarea' });
    }

    await task.remove();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
}

// Obtener todas las tareas


// Obtener tareas completadas
async function getCompletedTasks(req, res) {
  try {
    const completedTasks = await Task.find({ estado: 'completa', usuario: req.user._id });
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas completadas', error });
  }
}

// Obtener tareas en progreso
async function getTasksInProgress(req, res) {
  try {
    const tasksInProgress = await Task.find({ estado: 'en_proceso', usuario: req.user._id });
    res.json(tasksInProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas en progreso', error });
  }
}

// Obtener tareas incompletas
async function getTasksIncomplete(req, res) {
  try {
    const incompleteTasks = await Task.find({ estado: { $ne: 'completa' }, usuario: req.user._id });
    res.json(incompleteTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas incompletas', error });
  }
}
async function getAllTasksByUser(req, res) {
  try {
    const userId = req.params.userId; // Obten el ID del usuario de los parámetros de la URL

  

    // Buscar todas las tareas asociadas al usuario
    const tasks = await Task.find({ usuario: userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas del usuario', error });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getCompletedTasks,
  getTasksInProgress,
  getTasksIncomplete,
  getAllTasksByUser,
};
