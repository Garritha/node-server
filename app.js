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
  return new Promise((resolve, reject) => {
    const tarea = {
      indicador: indicador,
      descripcion: descripcion,
      estado: estado
    };

    tareas.push(tarea);
    resolve();
  });
}

// Función para eliminar una tarea
function eliminarTarea(indicador) {
  return new Promise((resolve, reject) => {
    tareas = tareas.filter(tarea => tarea.indicador !== indicador);
    resolve();
  });
}

// Función para marcar una tarea como completada
function completarTarea(indicador) {
  return new Promise((resolve, reject) => {
    tareas.forEach(tarea => {
      if (tarea.indicador === indicador) {
        tarea.estado = 'completada';
      }
    });
    resolve();
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
async function ejecutarOpcion(opcion) {
  switch (opcion) {
    case '1': {
      try {
        const indicador = await prompt('Ingrese el indicador de la tarea: ');
        const descripcion = await prompt('Ingrese la descripción de la tarea: ');
        const estado = await prompt('Ingrese el estado de la tarea (completada o pendiente): ');

        await añadirTarea(indicador, descripcion, estado);
        console.log('Tarea añadida con éxito!');
        mostrarTareas();
      } catch (error) {
        console.error('Error al añadir la tarea:', error);
      }
      rl.close();
      break;
    }
    case '2': {
      try {
        const indicador = await prompt('Ingrese el indicador de la tarea que desea eliminar: ');
        await eliminarTarea(indicador);
        console.log('Tarea eliminada con éxito!');
        mostrarTareas();
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
      rl.close();
      break;
    }
    case '3': {
      try {
        const indicador = await prompt('Ingrese el indicador de la tarea que desea marcar como completada: ');
        await completarTarea(indicador);
        console.log('Tarea marcada como completada con éxito!');
        mostrarTareas();
      } catch (error) {
        console.error('Error al completar la tarea:', error);
      }
      rl.close();
      break;
    }
    default: {
      console.log('Opción no válida. Por favor, seleccione una opción válida.');
      rl.close();
      break;
    }
  }
}

// Función para solicitar una entrada al usuario
function prompt(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Mostrar opciones al usuario
console.log('Seleccione una opción:');
console.log('1. Añadir tarea');
console.log('2. Eliminar tarea');
console.log('3. Completar tarea');

// Leer opción seleccionada por el usuario
rl.question('Opción: ', async opcion => {
  await ejecutarOpcion(opcion);
});