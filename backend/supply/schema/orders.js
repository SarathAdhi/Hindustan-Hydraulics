const mongoose = require('mongoose');



// const Store = mongoose.Schema({
//     smc: {
//         type: String,
//         enum: ['part', 'full', 'none'],
//         default: 'none',
//     },
//     general: {
//         type: String,
//         enum: ['part', 'full', 'none'],
//         default: 'none',
//     },
//     instrumentation: {
//         type: String,
//         enum: ['part', 'full', 'none'],
//         default: 'none',
//     },
//     hydraulics: {
//         type: String,
//         enum: ['part', 'full', 'none'],
//         default: 'none',
//     },
//     hose: {
//         type: String,
//         enum: ['part', 'full', 'none'],
//         default: 'none',
//     }
// });

const orderSchema = mongoose.Schema({
    s_no: {
        type: Number,
        required: [true, 'Please enter a serial number!'],
        trim: true,
        unique: true
    },
    //TODO: Check if order Schema needs DOC NO
    // doc_type: {
    //     type: String,
    //     required: [true, 'Please enter a document type!'],
    //     enum: ['so_no', 'proforma_no', 'dc_no', 'uhp_dc_no', 'sam_dc_no'],
    //     trim: true
    // },
    // doc_no: {
    //     type: Number,
    //     required: [true, 'Please enter a document number!'],
    //     trim: true,
    // unique: true //TODO: Check if this should be unique
    // },
    date: {
        type: Date,
    },
    purchase_order_no: {
        type: String,
        required: [true, 'Please enter a purchase order number!'],
        trim: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: [true, 'Please enter a customer name!'],
        trim: true,
    },
    store: {
        type: Array, //Uses Store Schema defined above
        default: () => ({}),
        required: true
    },
    counter_no: {
        type: Number,
        default: null
    },
    ready: {
        type: Boolean,
        default: false
    },
    ready_to_bill: {
        type: Boolean,
        default: false
    },
    bill_ready: {
        type: Boolean,
        default: false
    },
    bill_no: {
        type: String,
        default: null
    },
    routing: {
        type: String,
        enum: ['transport', 'travel', 'courier', 'hand_delivery', 'auto', 'from_uhp', 'from_sam', 'branch_office', 'none'],
        default: 'none'
    },
    security_out: {
        type: Boolean,
        default: false
    },
    reg_no: {
        type: Number,
        default: null
    }
});

module.exports = OrderModel = mongoose.model('supply-Order', orderSchema);