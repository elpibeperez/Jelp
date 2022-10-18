const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const Reviews = new mongoose.Schema({
    reviewer: { type: ObjectId, required: true}, 
    store: { type: ObjectId, required: true}, 
    title: { type: String, required: true },
    review: { type: String, required: true },
    stars: { type: Number, required: true },
    pictures: [{ type: String}],
});


module.exports = mongoose.model('Reviews', Reviews)