const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const AuthSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
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
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,

    },
});

AuthSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//TODO: Implement compare password method in mongoose Schema methods
AuthSchema.methods.verifyPassword = async function(user_password, db_password) {
    return await bcrypt.compare(user_password, db_password);
}


module.exports = Auth = mongoose.model('Auth', AuthSchema);
// module.exports = Auth = mongoose.model('Auth', AuthSchema);