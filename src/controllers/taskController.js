const tasks = require('../utils/taskData.json');

function createTask(req, res) {
  const { descripcion, estado } = req.body;

  const newTask = {
    id: tasks.length + 1,
    descripcion,
    estado
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.includes(task=> task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
}

function updateTask(req, res) {
  const taskId = parseInt(req.params.id);
  const { descripcion, estado } = req.body;

  const task = tasks.find(task => task.id === taskId);

  if (task) {
    console.log("tarea encontrada:", task);
    task.descripcion = descripcion || task.descripcion;
    task.estado = estado || task.estado;

    res.json(task);
  } else {
     console.log("tarea no encontrada:", tasks);
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
}
function getAllTasks(req, res) {
  res.json(tasks);
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
};

