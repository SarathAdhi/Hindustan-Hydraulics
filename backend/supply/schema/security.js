const mongoose = require('mongoose');

const securityEntrySchema = mongoose.Schema({
    purchase_order_no: {
        type: String,
        required: true,
        // unique: true
    },
    security_out: {
        type: Boolean,
        required: true,
    },
    book_register_no: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = securityEntryModel = mongoose.model('Supply-Security', securityEntrySchema);