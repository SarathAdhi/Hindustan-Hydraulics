const storeModel = require('../schema/stores');
const orderModel = require('../schema/orders');
const AppError = require('../utils/error');
const Utils = require('../utils/validator');

exports.entry = async(req, res, next) => {
    try {
        const check = Utils.verify_store_scheme(req.body.store, req.body.supply);
        if (check) {
            return next(new AppError(check, 400));
        }
        const { store, purchase_order_no, supply } = req.body;
        if (!store || !purchase_order_no || !supply) {
            return next(new AppError('Please provide all the required fields!', 400));
        }
        const order = await orderModel.findOne({ purchase_order_no: purchase_order_no });
        if (!order) {
            return next(new AppError('Invalid Purchase Order Id!', 400));
        }

        //TODO: Check if the materials from all stores are ready before billing
        // if (req.body.ready_to_bill) {
        // }

        storeModel.updateOne({
            purchase_order_no: order.purchase_order_no,
            store: store,
        }, {
            store: req.body.store,
            purchase_order_no: order.purchase_order_no,
            doc_type: order.doc_type,
            doc_no: order.doc_no,
            customer_name: order.customer_name,
            supply: req.body.supply,
            ready: req.body.ready,
            ready_to_bill: req.body.ready_to_bill,
        }, {
            upsert: true,
        }).then((s) => {
            orderModel.updateOne({
                purchase_order_no: order.purchase_order_no,
                store: { $elemMatch: { store_name: store } }
            }, {
                $set: {
                    "store.$.supply": req.body.supply,
                    "ready_to_bill": req.body.ready_to_bill,
                    "ready": req.body.ready_to_bill,
                }
            }).then((result) => {
                res.status(201).json({
                    "status": "success",
                    "data": result
                });
            }).catch((err) => {
                console.log(err)
            })

        }).catch((err) => {
            res.status(400).json({
                "status": "error",
                "data": err
            });
        })
    } catch (err) {
        next(new AppError(err, 500));
    }
}

exports.getSupplies = async(req, res, next) => {
    try {
        console.log(req.params)
        if (!req.params.po_no) {
            return next(new AppError('Please provide purchase order number', 400));
        }
        storeModel.find({ purchase_order_no: req.params.po_no })
            .then((supply) => {
                res.status(200).json({
                    "status": "success",
                    "data": supply
                })

            }).catch((err) => {
                res.status(400).json({
                    "status": "error",
                    "data": err
                });
            });
    } catch (err) {
        next(new AppError(err, 500));
    }

}