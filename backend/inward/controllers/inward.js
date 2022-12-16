const inwardModel = require('../schema/inward');
const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');

exports.updateInwardDocument = (inward_doc_no, body) => {
    return new Promise((resolve, reject) => {
        orderModel.updateOne({
                inward_doc_no: inward_doc_no
            }, { $set: body })
            .then((result) => {
                resolve({ "msg": "Update Success", data: result })
            })
            .catch((err) => {
                reject({ "msg": "Update Failed", data: err })
            })
    })
}

exports.inwardEntry = catchAsync(async(req, res, next) => {
    const store = [{
        store_name: "smc",
        received: false
    }, {
        store_name: "general",
        received: false
    }, {
        store_name: "instrumentation",
        received: false
    }, {
        store_name: "hydraulics",
        received: false
    }, {
        store_name: "hose",
        received: false
    }, {
        store_name: "tc_counter",
        received: false
    }, {
        store_name: "lc_counter",
        received: false
    }]

    req.body.store = store;

    const lastInward = await inwardModel.findOne().sort({ s_no: -1 }).limit(1);
    req.body.s_no = lastInward ? lastInward.s_no + 1 : 1;
    inwardModel.create(req.body).then((inward) => {
        res.status(201).json({
            "status": "success",
            "data": inward
        });
    }).catch((err) => {
        return next(new AppError(err.message, 400));
        res.status(400).json({
            "status": "error",
            "data": err
        });
    })
});