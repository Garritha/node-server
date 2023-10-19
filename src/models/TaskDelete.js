import mongoose from "mongoose";

const TaskDelete = new mongoose.Schema({
    titulo:String,
    descripcion:String,
    fechaEliminacion: { type: Date, default: Date.now },
    eliminada: { type: Boolean, default: false },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
    },
})

const TareaEliminada = mongoose.model("TareaEliminada", TaskDelete);

export default TareaEliminada;