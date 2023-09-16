const Task = require('../models/Schema')


// Crea una nueva tarea en MongoDB
async function createTask(req, res) {
  try {
    const { descripcion } = req.body;

    const newTask = new Task({
      descripcion,
      estado: false, // El estado comienza en 'false'
    });

    await newTask.save(); // Guarda la tarea en MongoDB
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
}

// Actualiza una tarea existente por su ID en MongoDB
async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { descripcion, estado } = req.body;

    const task = await Task.findById(taskId);

    if (task) {
      task.descripcion = descripcion || task.descripcion;
      task.estado = estado || task.estado;

      await task.save(); // Actualiza la tarea en MongoDB
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
    const completedTasks = await Task.find({ estado: true });
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas completadas', error });
  }
}

// Obtiene todas las tareas con estado 'incompleta' desde MongoDB
async function getIncompleteTasks(req, res) {
  try {
    const incompleteTasks = await Task.find({ estado: false });
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
