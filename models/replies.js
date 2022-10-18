const mongoose = require('mongoose');


/*id_respuesta
id_comentario
id_respuesta_padre
texto_respuesta*/

const Replies = new mongoose.Schema({
    id_comment: { type: mongoose.ObjectId, required: true},
    id_reply: { type: mongoose.ObjectId},
    reply: { type: String, required: true },
});

module.exports = mongoose.model('Replies', Replies)
