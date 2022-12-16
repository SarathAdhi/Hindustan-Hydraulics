const mongoose = require('mongoose');

const securityInwardEntrySchema = new mongoose.Schema({
    security_entry: {
        type: Boolean,
        required: [true, 'Please enter a security entry!'],
        default: false

    },
    reg_no: {
        type: String,
        required: [true, 'Please enter a registration number!'],
        trim: true,
        // unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});