const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre no puede estar vacío'],
  },
  email: { 
    type: String,
    required: [true, 'Debe ingresar un correo electrónico'],
    unique: [true, 'Este email ya está registrado en la base de datos'],
  },
  password: {
    type: String,
    required: [true, 'Debe ingresar una contraseña'],
    validate: {
      validator: function (value) {
        // Expresión regular para verificar la complejidad de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y tener al menos 8 caracteres',
    },
  },
  rol: {
    type: String,
    enum: ['usuario', 'administrador'], // Rol debe ser algunos de estos valores
    default: 'usuario',
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const User = mongoose.model('User', userSchema, 'usuarios');

module.exports = User;
