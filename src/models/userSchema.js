const mongoose = require ('mongoose');

//  esquema para "user"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'El nombre no puede estar vacio']
    },
    mail: {
        type :String,
        required:[ true , 'Debe ingresar un correo electronico'],
        unique: [true ,'Este email ya esta registrado en la base de datos' ],
    },
    rol: {
        type: String,
        enum: ['usuarios','administrador'], // Rol debe ser algunos de estos valores 
        default: 'usuarios',
    },
    
});

const User = mongoose.model('User',userSchema);

module.exports = User; 