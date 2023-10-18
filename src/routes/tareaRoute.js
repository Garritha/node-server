import express from "express";
import {
  agregarTarea,
  eliminarTarea,
  actualizarTarea,
  obtenerTareas,
  obtenerTareaid,
  cambiarEstadoTarea,
  obtenerTareasPorUsuarioId
  
} from "../controllers/tareaController.js";
const router = express.Router();


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