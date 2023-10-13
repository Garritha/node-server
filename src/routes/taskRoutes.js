// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/crear', taskController.createTask);
router.delete('/eliminar/:taskId', taskController.deleteTask);
router.put('/actualizar/:taskId', taskController.updateTask);
router.get('/completas', taskController.getCompletedTasks);
router.get('/incompletas', taskController.getIncompleteTasks);
router.get('/:taskId', taskController.getTaskById);

module.exports = router;
