const mongoose = require('mongoose');

// esuqema para coleccion "task"

const taskSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true //titulo obligatorio
    },
    descripcion : String,
    fechadecreacion:{
        type:Date,
        default: Date.now, // establece la fecha de creacion automatica 
    },
    estado:{
        type:String,
        enum:['pendiente','en_progreso','completa'], // estados debe ser alguno de estos 
        default:'pendiente',
    },
       
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 