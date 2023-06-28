const billingModel = require('../schema/billing');
const orderModel = require('../schema/orders');
const AppError = require('../../utils/error');
const { updateOrderDocument } = require('./orders');
const catchAsync = require('../../utils/catchAsync');
const EventEmitter = require('../../lib/EventEmitter.class');

exports.createBill = async(req, res, next) => {
    try {
        const { doc_no, bill_no } = req.body;

        const order = await orderModel.findOne({ doc_no });
        if (!order) {
            return next(new AppError('Invalid doc number!', 400));
        }
        const bill = await billingModel.findOne({ doc_no });

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
                orderModel.findOneAndUpdate({ doc_no }, { bill_ready: true, bill_no: billing.bill_no, routing: billing.routing })
                    .then((order) => {
                        const eventEmitter = new EventEmitter();
                        eventEmitter.emit({ event: "billing" })
                        res.status(200).json({
                            status: 'success',
                            message: 'Bill generated successfully',
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

    const { doc_no, bill_no } = req.body;
    // const query = doc_no || bill_no;
    if (doc_no) {
        const bill = await billingModel.findOne({ doc_no: doc_no })
        if (!bill) {
            return next(new AppError("Bill Not Found", 400));
        }
    }
    if (bill_no) {
        const bill = await billingModel.findOne({ bill_no: bill_no })
        if (!bill) {
            return next(new AppError("Invalid Bill Number", 400));
        }
        doc_no = bill.doc_no;
    }


    billingModel.updateOne({
            $or: [{ doc_no : doc_no }, { bill_no: bill_no }]
        }, {
            order_status: req.body.order_status,
            routing: req.body.routing,
            bill_ready: req.body.bill_ready,
        })
        .then((result) => {
            updateOrderDocument(doc_no, { bill_ready: req.body.bill_ready, routing: req.body.routing, order_status: req.body.order_status })
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
    const { doc_no, bill_no } = req.body;

    const bill = await billingModel.findOne({ doc_no })
    if (!bill) {
        return next(new AppError("Bill Not Found", 400));
    }

    billingModel.updateOne({ doc_no }, { bill_no })
        .then((result) => {
            updateOrderDocument(doc_no, {bill_no })
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

exports.getBills = (req, res, next) => {
    billingModel.find().then((bills) => {
        res.status(200).json({
            "status": "success",
            "total": bills.length,
            "data": bills
        });
    }).catch((err) => {
        res.status(400).json({
            "status": "error",
            "data": err
        });
    })
}


exports.getBill = (req, res, next) => {
    console.log(req.query, req.params)
    billingModel.findOne({ $or : [{ doc_no: req.query.doc_no }, { bill_no: req.query.bill_no }]})
        .then((bill) => {
            res.status(200).json({
                "status": "success",
                "data": bill
            })
        })
        .catch((err) => {
            res.status(400).json({
                "status": "error",
                "data": err
            });
        })
}

exports.getReadyToBillDocs = async(req,res,next) => {

    const docs = await orderModel.find({ ready_to_bill: true })
    res.status(200).json({
        status: 'success',
        message: 'Ready to bill docs',
        count : docs.length,
        data: docs
    })
}