const readline = require('readline');

// Crear interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array para almacenar las tareas
let tareas = [];

// Función para añadir una nueva tarea
function añadirTarea(indicador, descripcion, estado) {
  const tarea = {
    indicador: indicador,
    descripcion: descripcion,
    estado: estado
  };

  tareas.push(tarea);
}

// Función para eliminar una tarea
function eliminarTarea(indicador) {
  tareas = tareas.filter(tarea => tarea.indicador !== indicador);
}

// Función para marcar una tarea como completada
function completarTarea(indicador) {
  tareas.forEach(tarea => {
    if (tarea.indicador === indicador) {
      tarea.estado = 'completada';
    }
  });
}

// Función para mostrar la lista de tareas
function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    console.log(`Indicador: ${tarea.indicador}`);
    console.log(`Descripción: ${tarea.descripcion}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log('---------------------');
  });
}

// Función para ejecutar la opción seleccionada por el usuario
function ejecutarOpcion(opcion) {
  switch (opcion) {
    case '1': {
      rl.question('Ingrese el indicador de la tarea: ', indicador => {
        rl.question('Ingrese la descripción de la tarea: ', descripcion => {
          rl.question('Ingrese el estado de la tarea (completada o pendiente): ', estado => {
            añadirTarea(indicador, descripcion, estado);
            console.log('Tarea añadida con éxito!');
            mostrarTareas();
            rl.close();
          });
        });
      });
      break;
    }
    case '2': {
      rl.question('Ingrese el indicador de la tarea que desea eliminar: ', indicador => {
        eliminarTarea(indicador);
        console.log('Tarea eliminada con éxito!');
        mostrarTareas();
        rl.close();
      });
      break;
    }
    case '3': {
      rl.question('Ingrese el indicador de la tarea que desea marcar como completada: ', indicador => {
        completarTarea(indicador);
        console.log('Tarea marcada como completada con éxito!');
        mostrarTareas();
        rl.close();
      });
      break;
    }
    default: {
      console.log('Opción no válida. Por favor, seleccione una opción válida.');
      rl.close();
      break;
    }
  }
}

// Mostrar opciones al usuario
console.log('Seleccione una opción:');
console.log('1. Añadir tarea');
console.log('2. Eliminar tarea');
console.log('3. Completar tarea');

// Leer opción seleccionada por el usuario
rl.question('Opción: ', opcion => {
  ejecutarOpcion(opcion);
});