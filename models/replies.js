const mongoose = require('mongoose');

const Replies = new mongoose.Schema({
    replier: { type: mongoose.ObjectId, required: true },
    review: { type: mongoose.ObjectId, required: true },
    father_reply: { type: mongoose.ObjectId },
    reply: { type: String, required: true },
});

module.exports = mongoose.model('Replies', Replies);
