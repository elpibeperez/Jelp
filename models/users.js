const mongoose = require('mongoose');
/*
nombre_de_usuario
nombres
apellidos
avatar
pais
tiendas_que_administra
*/

const Users = new mongoose.Schema({
    username:   { type: String, required: true },
    fullname:   { type: String, required: true },
    about_me:   { type: String, required: true },
    avatar:     { type: String, required: true },
    country:    { type: String, required: true },
    enabled:    { type: Boolean, required: true, default: true}
});

module.exports = mongoose.model('Users', Users)
