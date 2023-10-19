import express from "express";
import {
  agregarTarea,
  eliminarTarea,
  actualizarTarea,
  obtenerTareas,
  obtenerTareaid,
  cambiarEstadoTarea,
  obtenerTareasPorUsuarioId,
  moverTareaAEliminadas
  
} from "../controllers/tareaController.js";
const router = express.Router();


router.post('/eliminar/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    // llama a la función que mueve la tarea a eliminadas 
    const tareaMovida = await moverTareaAEliminadas(taskId);

    if (tareaMovida) {
      res.json({ msg: "Tarea movida a eliminadas" });
    } else {
      res.status(404).json({ msg: "Tarea no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al mover la tarea a eliminadas" });
  }
})


router
  .route("/crear")
  .post(agregarTarea)
  
  router.get("/", obtenerTareas);
  router.get("/:id/tareas", obtenerTareasPorUsuarioId)
  // operaciones del crud 
  router
    .route("/:id")
    .get(obtenerTareaid)
    
    .put(actualizarTarea)
    .delete(eliminarTarea)
    .patch(cambiarEstadoTarea);
  

export default router;