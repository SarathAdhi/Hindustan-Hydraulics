const mongoose = require('mongoose');

const securityInwardEntrySchema = new mongoose.Schema({
    inward_no: {
        type: Number,
        required: [true, 'Please enter an inward number!'],
        trim: true,
        unique: true
    },
    security_entry: {
        type: Boolean,
        required: [true, 'Please enter a security entry!'],
        default: false
    },
    reg_no: {
        type: Number,
        required: [true, 'Please enter a registration number!'],
        trim: true,
        // unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('inward-security', securityInwardEntrySchema);