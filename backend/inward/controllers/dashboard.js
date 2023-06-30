const inwardModel = require("../schema/inward");
const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const EventEmitter = require("../../lib/EventEmitter.class");

exports.getInwards = catchAsync(async (req, res, next) => {
	try {
		const inwards = await inwardModel.find({});
		res.status(200).json({
			status: "success",
			total: inwards.length,
			data: inwards,
		});
	} catch (err) {
		next(new AppError(err, 500));
	}
});
