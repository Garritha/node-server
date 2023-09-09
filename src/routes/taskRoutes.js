const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/', taskController.getAllTasks);  // mostrar todas las tareas 
router.post('/crear', taskController.createTask); // crear una tarea 
router.delete('/eliminar/:id', taskController.deleteTask); // eliminar tarea por id
router.put('/actualizar/:taskId', taskController.updateTask); // actulizar tarea por id 
router.get('/completas', taskController.getCompletedTasks); // Agregar ruta para obtener tareas completadas
router.get('/incompletas', taskController.getIncompleteTasks); // Agregar ruta para obtener tareas incompletas
router.get('/:taskId', taskController.getTaskById); // Agregar ruta para obtener una sola tarea por ID

module.exports = router;