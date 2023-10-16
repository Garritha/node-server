const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true,
    },
    descripcion: String,
    fechadecreacion: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: ['pendiente', 'en_progreso', 'completa'],
      default: 'pendiente',
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Esto establece una referencia al modelo User
    },
  });
  
  const Task = mongoose.model('Task', taskSchema, 'tareas');
  
module.exports = Task;
