const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        // validate: [validator.isMobilePhone, 'Please enter a valid mobile phone number']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 8,
    },
});

AuthSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = Auth = mongoose.model('Auth', AuthSchema);