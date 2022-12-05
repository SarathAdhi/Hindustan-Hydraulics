const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,

    },
});

module.exports = Auth = mongoose.model('Auth', AuthSchema);