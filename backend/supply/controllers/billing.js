const billingModel = require('../schema/billing');
const orderModel = require('../schema/orders');
const AppError = require('../../utils/error');
const { updateOrderDocument } = require('./orders');
const catchAsync = require('../../utils/catchAsync');
const EventEmitter = require('../../lib/EventEmitter.class');

exports.createBill = async(req, res, next) => {
    try {
        const { purchase_order_no, bill_no } = req.body;

        const order = await orderModel.findOne({ purchase_order_no: purchase_order_no });
        if (!order) {
            return next(new AppError('Invalid Purchase Order Id!', 400));
        }
        const bill = await billingModel.findOne({ purchase_order_no: purchase_order_no });

        if (order.bill_ready || bill) {
            return next(new AppError('Bill already generated for this order!', 400));
        }
        const bill1 = await billingModel.findOne({ bill_no: bill_no });

        if (bill1) {
            return next(new AppError('Bill Number already in use!', 400));
        }
        if (!order.ready_to_bill) {
            return next(new AppError('Order not ready to bill!', 400));
        }

        //TODO: Implement Transaction
        billingModel.create(req.body)
            .then((billing) => {
                orderModel.findOneAndUpdate({ purchase_order_no: purchase_order_no }, { bill_ready: true, bill_no: billing.bill_no, routing: billing.routing })
                    .then((order) => {
                        const eventEmitter = new EventEmitter();
                        eventEmitter.emit({ event: "billing" })
                        res.status(200).json({
                            status: 'success',
                            data: billing
                        })
                    }).catch((err) => {
                        // next(new AppError(err, 500));
                        res.status(500).json({
                            status: 'error',
                            message: err
                        })
                    })
            })
            .catch((err) => {
                // next(new AppError(err, 500));
                res.status(500).json({
                    status: 'error',
                    message: err
                })
            })
    } catch (err) {
        next(new AppError(err, 500));
    }
}

//FIXME: Route works even if bill no is passed as purchase_order_no and vice versa
exports.updateBill = async(req, res, next) => {

    const { purchase_order_no, bill_no } = req.body;
    const query = purchase_order_no || bill_no;
    if (purchase_order_no) {
        const bill = await billingModel.findOne({ purchase_order_no: purchase_order_no })
        if (!bill) {
            return next(new AppError("Bill Not Found", 400));
        }
    }
    if (bill_no) {
        const bill = await billingModel.findOne({ bill_no: bill_no })
        if (!bill) {
            return next(new AppError("Invalid Bill Number", 400));
        }
    }

    billingModel.updateOne({
            $or: [{ purchase_order_no: purchase_order_no }, { bill_no: bill_no }]
        }, {
            order_status: req.body.order_status,
            routing: req.body.routing,
            bill_ready: req.body.bill_ready,
        })
        .then((result) => {
            updateOrderDocument(purchase_order_no, { bill_ready: req.body.bill_ready, routing: req.body.routing, order_status: req.body.order_status })
            res.status(200).json({
                status: 'success',
                data: result
            })
        })
        .catch((err) => {
            console.error(err)
                // next(new AppError(err, 501));
            res.status(500).json({
                status: 'error',
                message: err
            })
        })

}

exports.updateBillNumber = catchAsync(async(req, res, next) => {
    const bill = await billingModel.findOne({ purchase_order_no: purchase_order_no })
    if (!bill) {
        return next(new AppError("Bill Not Found", 400));
    }
    const { purchase_order_no, bill_no } = req.body;
    billingModel.updateOne({ purchase_order_no: purchase_order_no }, { bill_no: bill_no })
        .then((result) => {
            updateOrderDocument(purchase_order_no, { bill_no: bill_no })
                .then((result) => {
                    res.status(200).json({
                        status: 'success',
                        data: result
                    })
                })
                .catch((err) => {
                    next(new AppError(err, 500));
                })
        })
        .catch((err) => {
            next(new AppError(err, 500));
        })
})