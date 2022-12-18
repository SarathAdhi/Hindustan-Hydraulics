const mongoose = require('mongoose');

const storeInwardSchema = mongoose.Schema({
    inward_no: {
        type: Number,
        required: [true, 'Please enter a inward number!'],
        trim: true,
    },
    store: {
        type: String,
        required: [true, 'Please enter a store name!'],
        trim: true,
        enu: ['smc', 'general', 'instrumentation', 'hydraulics', 'hose']
    },
    customer_name: {
        type: String,
        required: [true, 'Please enter a customer name!'],
    },
    doc_type: {
        type: String,
        required: [true, 'Please enter a document type!'],
        enum: ['bill_no', 'dc_no', 'note_no', 'uhp_dc_no', 'sam_dc_no', 'return_invoice_no', 'service_materials_no'],
        trim: true,
    },
    doc_no: {
        type: String,
        required: [true, 'Please enter a document number!'],
        trim: true,
    },
    received: {
        type: Boolean,
        default: false,
        required: [true, 'Please enter a received status!'],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inward-Store', storeInwardSchema);