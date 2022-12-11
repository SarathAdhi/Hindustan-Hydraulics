const AppError = require('../utils/error');
const mongoose = require('mongoose');
const orderModel = require('../schema/orders');

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