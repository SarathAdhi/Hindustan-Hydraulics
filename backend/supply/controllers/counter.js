const counterEntryModel = require('../schema/counter');
const catchAsync = require('../../utils/catchAsync');
const orderModel = require('../schema/orders');
const AppError = require('../../utils/error');
const { updateOrderDocument } = require('./orders');


exports.counterEntry = catchAsync(async(req, res, next) => {
    const { purchase_order_no } = req.body;

    const order = await orderModel.findOne({ purchase_order_no: purchase_order_no });
    if (!order) {
        return next(new AppError('Invalid Purchase Order Id!', 400));
    }
    const counter = await counterEntryModel.findOne({
        purchase_order_no: purchase_order_no
    })
    if (counter) {
        return next(new AppError('Counter Entry already generated for this order!', 400));
    }

    counterEntryModel.create(req.body)
        .then((data) => {
            const { counter_no, routing } = req.body;
            console.log(data);
            updateOrderDocument(req.body.purchase_order_no, {
                    counter_no,
                    routing
                })
                .then((result) => {
                    res.status(201).json({
                        message: 'success',
                        data: data,
                        result
                    });
                })
                .catch((err) => {
                    res.status(401).json({
                        status: 'fail',
                        error: err
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                status: 'fail',
                error: err
            });
        });
})