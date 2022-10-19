const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    about_me: { type: String, required: true },
    avatar: { type: String, required: true },
    country: { type: String, required: true },
    enabled: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Users', Users);
