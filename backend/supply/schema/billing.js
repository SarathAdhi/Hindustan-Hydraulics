const mongoose = require('mongoose');
const storeSchema = require('./stores');

//TODO: Create Schema to Display the Store entry Info in billing Entry Form
// const billingFormStoreDisplaySchema = mongoose.Schema({
//     purchase_order_no: {
//         type: String,

//     }
// });


const billingEntryScheme = mongoose.Schema({
    //TODO: Decide whether to use this or not for displaying store entry data in billing entry form
    // store: {
    //     type: [storeSchema],
    //     required: true
    // },
    purchase_order_no: {
        type: String,
        required: [true, 'Please enter a purchase order number!'],
        trim: true,
        unique: true
    },
    order_status: {
        type: String,
        required: [true, 'Please enter a order status!'],
        enum: ['part_supply', 'full_supply']
    },
    bill_no: {
        type: String,
        required: [true, 'Please enter a bill number!'],
        trim: true,
        unique: true
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
    auto_gen_no: {
        type: Number,
        default: function() {
            return Math.floor(Math.random() * 9000 + 1000);
        },
        // required: [true, 'Please enter a auto generated number!'],
    },
    billed_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Supply-Billing', billingEntryScheme);