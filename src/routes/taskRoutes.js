const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/crear', authenticateToken, taskController.createTask);
router.put('/actualizar/:taskId', authenticateToken, taskController.updateTask);
router.delete('/eliminar/:taskId', authenticateToken, taskController.deleteTask);

router.get('/', taskController.getAllTasks);
router.get('/completas', authenticateToken, taskController.getCompletedTasks);
router.get('/incompletas', authenticateToken, taskController.getIncompleteTasks);
router.get('/:taskId', authenticateToken, taskController.getTaskById);

module.exports = router;
