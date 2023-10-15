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
      minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    },
    rol: {
      type: String,
      enum: ['usuarios', 'administrador'], // Rol debe ser algunos de estos valores
      default: 'usuarios',
    },
  });

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;