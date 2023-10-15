const mongoose = require('mongoose');

// Esquema para la colección "task"
const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
