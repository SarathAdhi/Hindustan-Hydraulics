const storeInwardModel = require('../schema/stores');
const inwardModel = require('../schema/inward')
const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');
const Utils = require('../../utils/validator');

const EventEmitter = require('../../lib/EventEmitter.class');



exports.inwardStoresEntry = catchAsync(async(req, res, next) => {
    const { inward_no, store, received, doc_type, doc_no } = req.body;

    if (!inward_no || !store || !received || !doc_type || !doc_no) {
        return next(new AppError('Please provide all the required fields!', 400));
    }

    const inward_details = inwardModel.findOne({ s_no: inward_no });
    if (!inward_details) {
        return next(new AppError('Invalid Inward Number!', 400));
    }

    const check = Utils.verify_store_inward_scheme(inward_no, store, doc_type, doc_no, received);
    if (check) {
        return next(new AppError(check, 400));
    }

    storeInwardModel.updateOne({ inward_no: inward_no, store: store }, {
            store: store,
            customer_name: req.body.customer_name,
            doc_type: req.body.doc_type,
            doc_no: req.body.doc_no,
            received: req.body.received,
            inward_no: inward_no,
        }, { upsert: true })
        .then((s) => {
            inwardModel.updateOne({
                    s_no: inward_no,
                    store: { $elemMatch: { store_name: store } }
                }, {
                    $set: {
                        "store.$.received": req.body.received,
                        "materials_received": req.body.materials_received,
                    }
                })
                .then((result) => {
                    const eventEmitter = new EventEmitter();
                    eventEmitter.emit({ event: "storeInwardEntry" })
                    res.status(201).json({
                        "status": "success",
                        "data": result
                    });
                }).catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.error(err);
            res.status(400).json({
                "status": "error",
                "data": err
            });
        });
});