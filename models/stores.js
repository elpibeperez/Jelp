const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

const Stores = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    heading: { type: String, required: true },
    tags: [String],
    logo: { type: String, required: true },
    pictures: [String],
    managers: [String],
    enabled: { type: Boolean, required: true, default: true}
});

module.exports = mongoose.model('Stores', Stores)
