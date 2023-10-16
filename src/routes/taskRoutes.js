const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rutas públicas sin autenticación
router.post('/crear', taskController.createTask);
router.put('/actualizar/:taskId', taskController.updateTask);
router.delete('/eliminar/:taskId', taskController.deleteTask);
router.get('/completas', taskController.getCompletedTasks);
router.get('/incompletas', taskController.getTasksIncomplete);
router.get('/enproceso', taskController.getTasksInProgress);
// Otras rutas públicas
router.get('/usuario/:userId', taskController.getAllTasksByUser);
module.exports = router;
