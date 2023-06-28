const securityInwardEntryModel = require('../schema/security');
const inwardModel = require('../schema/inward')
const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');
const Utils = require('../../utils/validator');
const EventEmitter = require('../../lib/EventEmitter.class');

exports.inwardSecurityEntry = catchAsync(async(req, res, next) => {
    const { doc_no, security_entry, reg_no } = req.body;

    if (!doc_no || !security_entry || !reg_no) {
        return next(new AppError('Please provide all the required fields!', 400));
    }

    const inward_details = await inwardModel.findOne({
        doc_no: req.body.doc_no
    });

    
    if (!inward_details) {
        return next(new AppError('Invalid Inward Doc Number!', 400));
    }

    const security_details = await securityInwardEntryModel.findOne({
        doc_no: req.body.doc_no
    });

    if (security_details) {
        return next(new AppError('Security Entry already generated for this order!', 400));
    }

    const test = await securityInwardEntryModel.findOne({
        reg_no: req.body.reg_no
    })

    if (test) {
        return next(new AppError('Security Entry already generated for this book register number!', 400));
    }

    securityInwardEntryModel.create(req.body)
        .then((entry) => {
            inwardModel.updateOne({
                    doc_no: doc_no
                }, {
                    $set: { security_inward: security_entry, inward_reg_no: reg_no }
                })
                .then((result) => {
                    const eventEmitter = new EventEmitter();
                    eventEmitter.emit({ event: "securityInwardEntry" })
                    res.status(201).json({
                        "status": "success",
                        "data": {
                            result,
                            entry
                        }
                    });
                })
                .catch((err) => {
                    // return next(new AppError(err.message, 400));
                    res.status(400).json({
                        "status": "error",
                        "data": err
                    });
                });

        })
        .catch((err) => {
            return next(new AppError(err.message, 400));
            res.status(400).json({
                "status": "error",
                "data": err
            });
        })

});