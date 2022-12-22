const orderModel = require('../schema/orders');
const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');
const EventEmitter = require('../../lib/EventEmitter.class');

exports.updateOrderDocument = (purchase_order_no, body) => {
    return new Promise((resolve, reject) => {
        orderModel.updateOne({
                purchase_order_no: purchase_order_no
            }, { $set: body })
            .then((result) => {
                resolve({ "msg": "Update Success", data: result })
            })
            .catch((err) => {
                reject({ "msg": "Update Failed", data: err })
            })
    })
}
exports.createOrder = catchAsync(async(req, res, next) => {

    const store = [{
        store_name: "smc",
        supply: "none"
    }, {
        store_name: "general",
        supply: "none"
    }, {
        store_name: "instrumentation",
        supply: "none"
    }, {
        store_name: "hydraulics",
        supply: "none"
    }, {
        store_name: "hose",
        supply: "none"
    }]
    req.body.store = store;

    const lastOrder = await orderModel.findOne().sort({ s_no: -1 }).limit(1);
    req.body.s_no = lastOrder ? lastOrder.s_no + 1 : 1;
    orderModel.create(req.body).then((order) => {
        const eventEmitter = new EventEmitter();
        eventEmitter.emit({ event: "order_created", data: order })
        res.status(201).json({
            "status": "success",
            "data": order
        });
    }).catch((err) => {
        return next(new AppError(err.message, 400));
        res.status(400).json({
            "status": "error",
            "data": err
        });
    })
})

exports.getOrders = (req, res, next) => {
    orderModel.find().then((orders) => {
        res.status(200).json({
            "status": "success",
            "total": orders.length,
            "data": orders
        });
    }).catch((err) => {
        res.status(400).json({
            "status": "error",
            "data": err
        });
    })
}

exports.getOrder = (req, res, next) => {
    orderModel.findOne({ purchase_order_no: req.params.po_no })
        .then((order) => {
            res.status(200).json({
                "status": "success",
                "data": order
            })
        })
        .catch((err) => {
            res.status(400).json({
                "status": "error",
                "data": err
            });
        })
}


exports.updateOrder = (req, res, next) => {
    orderModel.updateOne({ purchase_order_no: req.body.purchase_order_no }, {
            date: req.body.date,
            customer_name: req.body.customer_name,
            routing: req.body.routing,
            bill_ready: req.body.bill_ready,
            ready: req.body.ready,
            ready_to_bill: req.body.ready_to_bill,
            bill_no: req.body.bill_no,
        })
        .then((result) => {
            res.status(201).json({
                "status": "success",
                "data": result
            });
        })
        .catch((err) => {
            res.status(400).json({
                "status": "error",
                "data": err
            });
        })
}