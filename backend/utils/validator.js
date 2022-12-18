const AppError = require('../utils/error');
const mongoose = require('mongoose');
const orderModel = require('../supply/schema/orders');

const storeSchema = mongoose.Schema({
    store_name: {
        type: String,
        enum: ['smc', 'general', 'instrumentation', 'hydraulics', 'hose'],
        required: [true, 'Please enter a store name!'],
        trim: true,
    },
    supply: {
        type: String,
        enum: ['part', 'full', 'none'],
        default: 'none',
    },
});

const storeModel = mongoose.model('check', storeSchema);

const storeInwardSchema = mongoose.Schema({
    inward_no: {
        type: Number,
        required: true,
    },
    store_name: {
        type: String,
        required: true,
        enum: ['smc', 'general', 'instrumentation', 'hydraulics', 'hose', 'tc_counter', 'lc_counter'],
    },
    doc_type: {
        type: String,
        required: true,
        enum: ['bill_no', 'dc_no', 'note_no', 'uhp_dc_no', 'sam_dc_no', 'return_invoice_no', 'service_materials_no'],
    },
    doc_no: {
        type: String,
        required: true,
    },
    received: {
        type: Boolean,
        required: true,
    }
});

const storeInwardModel = mongoose.model('check1', storeInwardSchema);


exports.verify_store_scheme = (store, supply) => {
    try {
        const check = new storeModel({
            store_name: store,
            supply: supply
        });
        let error = check.validateSync();
        if (error) {
            console.error(error);
            return error;
        }
        return false;
    } catch (err) {
        return err;
    }
}

exports.verify_store_inward_scheme = (inward_no, store, doc_type, doc_no, received) => {
    try {
        const check = new storeInwardModel({
            inward_no: inward_no,
            store_name: store,
            doc_type: doc_type,
            doc_no: doc_no,
            received: received
        });
        let error = check.validateSync();
        if (error) {
            console.error(error);
            return error;
        }
        return false;
    } catch (err) {
        return err;
    }
}