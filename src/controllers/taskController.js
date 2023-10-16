const Task = require('../models/Schema');
const mongoose = require('mongoose');

async function createTask(req, res) {
  try {
    const { descripcion, titulo } = req.body;
    const userId = req.user._id; 

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      titulo,
      descripcion,
      usuario: userId
    });

    await newTask.save();

    console.log('Tarea guardada con éxito:', newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ message: 'Error al crear la tarea', error });
  }
}


async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { titulo, descripcion, estado } = req.body;

    // Buscar la tarea por su ID en la base de datos
    const task = await Task.findById(taskId);

    if (task) {
      // Actualizar los campos de la tarea con los datos proporcionados (si se proporcionan)
      if (titulo !== undefined) {
        task.titulo = titulo;
      }
      if (descripcion !== undefined) {
        task.descripcion = descripcion;
      }
      if (estado !== undefined) {
        task.estado = estado;
      }

      // Guardar la tarea actualizada en la base de datos
      await task.save();

      // Responder con la tarea actualizada
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (task) {
      res.json({ message: 'Tarea eliminada' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
}

async function getAllTasks(req, res) {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const tasks = await Task.find({ usuario: userId });

    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
}


async function getTaskById(req, res) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
}

async function getCompletedTasks(req, res) {
  try {
    const completedTasks = await Task.find({ estado: 'completa' });
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas completadas', error });
  }
}

async function getIncompleteTasks(req, res) {
  try {
    const incompleteTasks = await Task.find({ estado: { $ne: 'completa' } });
    res.json(incompleteTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas incompletas', error });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getCompletedTasks,
  getIncompleteTasks,
};
