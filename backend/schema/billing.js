const mongoose = require('mongoose');
const storeSchema = require('./stores');
const billingEntryScheme = mongoose.Schema({
    store: {
        type: [storeSchema],
        required: true
    },
    order_status: {
        type: Boolean,
        required: [true, 'Please enter a order status!'],
    },
    bill_no: {
        type: String,
        required: [true, 'Please enter a bill number!'],
        trim: true,
    },
    routing: {
        type: String,
        required: [true, 'Please enter a routing!'],
        trim: true,
        enum: ['transport', 'travel', 'courier', 'hand_delivery', 'auto', 'from_uhp', 'from_sam', 'branch_office']
    },
    bill_ready: {
        type: Boolean,
        required: [true, 'Please enter a bill ready status!'],
    },
});

module.exports = mongoose.model('Billing', billingEntryScheme);