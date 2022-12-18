const securityInwardEntryModel = require('../schema/security');
const inwardModel = require('../schema/inward')
const AppError = require('../../utils/error');
const catchAsync = require('../../utils/catchAsync');
const Utils = require('../../utils/validator');

exports.inwardSecurityEntry = catchAsync(async(req, res, next) => {
    const { inward_no, security_entry, reg_no } = req.body;

    if (!inward_no || !security_entry || !reg_no) {
        return next(new AppError('Please provide all the required fields!', 400));
    }

    const inward_details = inwardModel.findOne({
        s_no: inward_no
    });

    if (!inward_details) {
        return next(new AppError('Invalid Inward Number!', 400));
    }

    securityInwardEntryModel.create(req.body)
        .then((security_entry) => {
            inwardModel.updateOne({
                    s_no: inward_no
                }, {
                    $set: { security_inward: security_entry, inward_reg_no: reg_no }
                })
                .then((result) => {
                    res.status(201).json({
                        "status": "success",
                        "data": {
                            result,
                            security_entry
                        }
                    });
                })
                .catch((err) => {
                    return next(new AppError(err.message, 400));
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