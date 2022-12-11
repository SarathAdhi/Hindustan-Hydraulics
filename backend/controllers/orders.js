const orderModel = require('../schema/orders');
const AppError = require('../utils/error');

exports.createOrder = (req, res, next) => {

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

    orderModel.create(req.body).then((order) => {
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
}

exports.getOrders = (req, res, next) => {
    orderModel.find().then((orders) => {
        res.status(200).json({
            "status": "success",
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