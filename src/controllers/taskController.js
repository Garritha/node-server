const Task = require('../models/Schema')
const mongoose = require('mongoose')


async function createTask(req, res) {
  try {
    const { descripcion, titulo } = req.body;

    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(), // Genera un nuevo ID
      titulo, // Agregar el título aquí
      descripcion,
    });
    

    // Guarda la tarea en MongoDB
    await newTask.save();

    console.log('Tarea guardada con éxito:', newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
}

// Actualiza una tarea existente por su ID en MongoDB
async function updateTask(req, res) {
  try {
    const { taskId } = req.params; // Obtiene el ID de la tarea de los parámetros de la URL
    const { titulo, descripcion, estado } = req.body; // Obtiene los datos actualizados de la solicitud

    // Busca la tarea por su ID en la base de datos
    const task = await Task.findById(taskId);

    if (task) {
      // Actualiza los campos de la tarea con los datos proporcionados (si se proporcionan)
      if (titulo !== undefined) {
        task.titulo = titulo;
      }
      if (descripcion !== undefined) {
        task.descripcion = descripcion;
      }
      if (estado !== undefined) {
        task.estado = estado;
      }

      // Guarda la tarea actualizada en la base de datos
      await task.save();

      // Responde con la tarea actualizada
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
}


// Elimina una tarea existente por su ID en MongoDB
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    console.log(taskId);
    if (task) {
      res.json({ message: 'Tarea eliminada' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
}

// Obtiene todas las tareas desde MongoDB
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
}

// Obtiene una tarea específica por su ID desde MongoDB
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

// Obtiene todas las tareas con estado 'completada' desde MongoDB
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
