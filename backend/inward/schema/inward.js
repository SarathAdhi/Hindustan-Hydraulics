const mongoose = require('mongoose');

const inwardSchema = mongoose.Schema({
    s_no: {
        type: Number,
        required: [true, 'Please enter a serial number!'],
        trim: true,
        unique: true
    },
    inward_doc_no: {
        type: String,
        required: [true, 'Please enter a inward document number!'],
        trim: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    supplier_name: {
        type: String,
        required: [true, 'Please enter a supplier name!'],
        trim: true,
    },
    store: {
        type: Array,
        default: () => ({}),
    },
    materials_received: {
        type: Boolean,
        default: false,
    },
    security_inward: {
        type: Boolean,
        default: false,
    },
    inward_reg_no: {
        type: String,
        trim: true,
        default: null
    },

});

module.exports = mongoose.model('Inward-materials', inwardSchema);