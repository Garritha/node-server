const tasks = require('../utils/taskData.json');

// Crea una nueva tarea con descripción y estado proporcionados, el estado siempre comienza en 'false'.
function createTask(req, res) {
  const { descripcion, estado } = req.body;

  const newTask = {
    id: tasks.length + 1,
    descripcion,
    estado: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

// Actualiza una tarea existente por su ID con la descripción y el estado proporcionados.
function updateTask(req, res) {
  const {taskId} = req.params;
  const { descripcion, estado } = req.body;

  const task = tasks.find(task => task.id == taskId);

  if (task) {
    task.descripcion = descripcion || task.descripcion;
    task.estado = estado || task.estado;

    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
}

// Elimina una tarea existente por su ID.
function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
}

// Obtiene todas las tareas.
function getAllTasks(req, res) {
  res.json(tasks);
}

// Obtiene una tarea específica por su ID.
function getTaskById(req, res) {
  const {taskId} = req.params;
  const task = tasks.find(task => task.id == taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
}

// Obtiene todas las tareas con estado 'completada'.
function getCompletedTasks(req, res) {
  const completedTasks = tasks.filter(task => task.estado === true);
  res.json(completedTasks);
}

// Obtiene todas las tareas con estado 'incompleta'.
function getIncompleteTasks(req, res) {
  const incompleteTasks = tasks.filter(task => task.estado === false);
  res.json(incompleteTasks);
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
