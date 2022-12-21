const orderModel = require('../schema/orders');
const securityEntryModel = require('../schema/security');

const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');

const { updateOrderDocument } = require('./orders');

exports.securityEntry = catchAsync(async(req, res, next) => {
    const { purchase_order_no, } = req.body;

    const order = await orderModel.findOne({ purchase_order_no: purchase_order_no });
    if (!order) {
        return next(new AppError('Invalid Purchase Order Id!', 400));
    }
    const security = await securityEntryModel.findOne({
        purchase_order_no: purchase_order_no
    });
    if (security) {
        return next(new AppError('Security Entry already generated for this order!', 400));
    }

    securityEntryModel.create(req.body)
        .then((data) => {
            const { security_out, book_register_no } = req.body;
            const reg_no = book_register_no
            updateOrderDocument(req.body.purchase_order_no, {
                    security_out,
                    reg_no
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
});