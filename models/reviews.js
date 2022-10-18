const mongoose = require('mongoose');

const Reviews = new mongoose.Schema({
    title: { type: String, required: true },
    review: { type: String, required: true },
    star: { type: Number, required: true },
    pictures: [{ type: String}],
});


module.exports = mongoose.model('Stores', Reviews)