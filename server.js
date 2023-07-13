const http  = require('http');

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    
    // Ruta de solicitud

    if (req.url === "/tareas" && req.method === "GET") {

        // arreglo de tareas

        const tareas = [
            {id: 1, descripcion: "Sacar al perro", estado: "pendiente" },
            {id: 2, descripcion: "Hacer ejercicio", estado: "completada"},
            {id: 3, descripcion: "Hacer mercado", estado:"completada"}
        ];

        // Devolucion del arreglo en formato json 

        res.statusCode = 200;
        res.end(JSON.stringify(tareas));
    
    } else {
        // Ruta no encontrada
        res.statusCode = 404;
        res.end();

        }

});

const puerto = 8080;

// INICIO DEL SERVER 

server.listen(puerto,() => {
    console.log("servidor Http iniciando en httpp:localhost:${puerto}");
});


