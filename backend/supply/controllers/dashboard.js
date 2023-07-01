const orderModel = require("../schema/orders");
const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const EventEmitter = require("../../lib/EventEmitter.class");

exports.getOrders = catchAsync(async (req, res, next) => {
	orderModel
		.find()
		.sort({ createdAt: -1 })
		.then((orders) => {
			res.status(200).json({
				status: "success",
				total: orders.length,
				data: orders,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				data: err,
			});
		});
});
