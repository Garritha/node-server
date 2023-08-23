const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/', taskController.getAllTasks);
router.post('/crear', taskController.createTask);
router.delete('/eliminar/:id', taskController.deleteTask);
router.put('/actualizar/:taskId',  taskController.updateTask);


module.exports = router;