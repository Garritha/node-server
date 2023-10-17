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

const dominiosPermitidos = ["http://localhost:5173"] // dominios permitidos para recibir peticiones


const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No esta permitido por CORS'))
        }
    }
}
app.use(cors({ origin: '*' }))


// rutas de  la aplicacion


app.use("/api/Usuario", UserRouter);
app.use("/api/Tarea", TareaRouter);



// para correr el servidor
const PORT =  8080;

app.listen(PORT, () => {
    console.log("Servidor ejecutandose en el puerto: 8080");
});