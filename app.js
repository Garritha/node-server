import express  from "express"; 

import dotenv from "dotenv";
import db from "./db.js";
import UserRouter from "./src/routes/userRoute.js";
import TareaRouter from "./src/routes/tareaRoute.js";
import cors from "cors";


// creacion de servidor
const app = express();
app.use(express.json()); 
dotenv.config(); 

// cors para que se pueda conectar con el front

 // dominios permitidos para recibir peticiones


 const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
};

app.use(cors(corsOptions));


// rutas de  la aplicacion


app.use("/v1/User", UserRouter);
app.use("/v1/Tarea", TareaRouter);



// para correr el servidor
const PORT =  8080;

app.listen(PORT, () => {
    console.log("Servidor ejecutandose en el puerto" + PORT);
});