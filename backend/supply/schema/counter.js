const mongoose = require('mongoose');

const counterEntrySchema = mongoose.Schema({
    purchase_order_no: {
        type: String,
        required: true,
        // unique: true
    },
    counter_no_type: {
        type: String,
        required: true,
        enum: ['tc_bill_no', 'proforma_no', 'dc_no', 'tc_note_no', 'lc_bill_no', 'lc_bill_no']
            // unique: true
    },
    counter_no: {
        type: Number,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true,

    },
    routing: {
        type: String,
        required: true,
        enum: ['transport', 'travel', 'courier', 'hand_delivery', 'auto', 'from_uhp', 'from_sam']
    },

});

module.exports = counterEntryModel = mongoose.model('Supply-Counter', counterEntrySchema);