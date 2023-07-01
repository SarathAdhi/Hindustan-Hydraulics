const counterEntryModel = require("../schema/counter");
const catchAsync = require("../../utils/catchAsync");
const orderModel = require("../schema/orders");
const AppError = require("../../utils/error");
const { updateOrderDocument } = require("./orders");
const EventEmitter = require("../../lib/EventEmitter.class");

exports.counterEntry = catchAsync(async (req, res, next) => {
	const { counter_no } = req.body;

	// const order = await orderModel.findOne({ counter_no });
	// if (!order) {
	//     return next(new AppError('Invalid Counter no!', 400));

	//     orderModel.create({

	//     })
	// }

	const counter = await counterEntryModel.findOne({
		counter_no,
	});
	if (counter) {
		return next(new AppError("Counter Entry already exist!", 400));
	}
	req.body.book_register_no = null;
	req.body.security_out = false;
	console.log(req.body);

	const { data } = req.body;

	// counterEntryModel.updateOne({
	//         counter_no: counter_no
	// },{
	//     data
	// }, { upsert: true })
	counterEntryModel
		.create(req.body)
		.then((data) => {
			const eventEmitter = new EventEmitter();
			eventEmitter.emit({ event: "counterEntry" });
			res.status(201).json({
				message: "success",
				data: data,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(421).json({
				status: "fail",
				error: err,
			});
		});
});

exports.updateCounterEntry = catchAsync(async (req, res, next) => {
	const { counter_no } = req.body;
	const counter = await counterEntryModel.findOne({
		counter_no,
	});
	if (!counter) {
		return next(new AppError("Counter Entry does not exist!", 400));
	}
	const { data } = req.body;
	counterEntryModel
		.updateOne(
			{
				counter_no: counter_no,
			},
			{
				data,
			}
		)
		.then((data) => {
			res.status(201).json({
				message: "success",
				data: data,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(421).json({
				status: "fail",
				error: err,
			});
		});
});

exports.getCounterEntry = catchAsync(async (req, res, next) => {
	const counter_no = req.params.counter_no;
	const counter = await counterEntryModel.findOne({
		counter_no,
	});
	if (!counter) {
		return next(new AppError("Counter Entry does not exist!", 400));
	}
	res.status(201).json({
		message: "success",
		data: counter,
	});
});

exports.getCounterEntries = catchAsync(async (req, res, next) => {
	const counter = await counterEntryModel.find();
	if (!counter) {
		return next(new AppError("Counter Entry does not exist!", 400));
	}
	res.status(201).json({
		message: "success",
		data: counter,
	});
});
