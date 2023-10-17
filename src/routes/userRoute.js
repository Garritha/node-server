import express from "express";

import {
  Registrar,
  ModificarUsuario,
} from "../controllers/usuarioController.js"
import autenticar from "../controllers/Logincontroller.js";
import verificarToken from "../middlewares/authLogin.js";

const router = express.Router();

// rutas de veterinario publicas

router.post("/", Registrar);
router.put("/:id", ModificarUsuario);

// rutas de  iniciar seccion
router.post('/login',autenticar,verificarToken)
export default router;
