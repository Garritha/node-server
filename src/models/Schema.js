const mongoose = require('mongoose');

// Esquema para la colección "task"
const taskSchema = new mongoose.Schema({
    // ID automático
    _id: mongoose.Schema.Types.ObjectId,

    titulo: {
        type: String,
        required: true, // Título obligatorio
    },
    descripcion: String,
    // Fecha de creación automática
    fechadecreacion: {
        type: Date,
        default: Date.now,
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en_progreso', 'completa'], // Estados debe ser alguno de estos
        default: 'pendiente',
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
