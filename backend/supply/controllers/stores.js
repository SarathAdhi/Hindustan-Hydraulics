const storeModel = require("../schema/stores");
const orderModel = require("../schema/orders");
const AppError = require("../../utils/error");
const Utils = require("../../utils/validator");
const EventEmitter = require("../../lib/EventEmitter.class");
const catchAsync = require("../../utils/catchAsync");

exports.entry = catchAsync(async (req, res, next) => {
	const order = await orderModel.findOne({ doc_no: req.body.doc_no });
	if (!order) {
		const order = await orderModel.findOne({ po_no: req.body.po_no });

		if (order) {
			return next(new AppError("PO Number already exists!", 400));
		}

		const store = [
			{
				store_name: "smc",
				supply: "none",
			},
			{
				store_name: "general",
				supply: "none",
			},
			{
				store_name: "instrumentation",
				supply: "none",
			},
			{
				store_name: "hydraulics",
				supply: "none",
			},
			{
				store_name: "hose",
				supply: "none",
			},
		];

		const po_no = req.body.po_no || req.body.purchaser_order_no;

		console.log("Creating new order");
		await orderModel.create({
			doc_type: req.body.doc_type,
			doc_no: req.body.doc_no,
			customer_name: req.body.customer_name,
			store: store,
			po_no: po_no,
			po_date: req.body.po_date,
		});
	}

	let data = await storeModel.findOne({
		doc_no: req.body.doc_no,
		store: req.body.store,
	});

	if (data) {
		return next(
			new AppError(
				"Store entry already exists for " + req.body.store + " store!",
				400
			)
		);
	}

	data = await storeModel.findOne({
		doc_no: req.body.doc_no,
	});
	console.log("Store hi", data);
	if (!data) {
		return 0;
	}
	if (data.doc_type != req.body.doc_type) {
		return next(new AppError("Document type mismatch!", 400));
	}

	const { store } = req.body;

	//TODO: Implement Transaction
	storeModel
		.create({
			store: req.body.store,
			doc_type: req.body.doc_type,
			doc_no: req.body.doc_no,
			doc_date: req.body.doc_date,
			customer_name: req.body.customer_name,
			po_no: req.body.po_no,
			po_date: req.body.po_date,
			supply: req.body.supply,
			ready: req.body.ready,
			ready_to_bill: req.body.ready_to_bill,
		})
		.then((s) => {
			console.log(s);
			orderModel
				.updateOne(
					{
						doc_no: req.body.doc_no,
						store: { $elemMatch: { store_name: store } },
					},
					{
						$set: {
							doc_date: req.body.doc_date,
							"store.$.supply": req.body.supply,
							ready_to_bill: req.body.ready_to_bill,
							ready: req.body.ready_to_bill,
						},
					}
				)
				.then((result) => {
					const eventEmitter = new EventEmitter();
					eventEmitter.emit({ event: "storeEntry" });
					res.status(201).json({
						status: "success",
						message: "Store Entry created successfully!",
						data: s,
					});
				})
				.catch((err) => {
					console.error(err);
					return next(new AppError(err, 400));
				});
		})
		.catch((err) => {
			console.error("no i am here", err);
			return next(new AppError(err, 400));
		});
});

exports.getSupplies = catchAsync(async (req, res, next) => {
	try {
		console.log(req.params);
		if (!req.params.doc_no) {
			return next(new AppError("Please provide Doc number", 400));
		}
		storeModel
			.find({ doc_no: req.params.doc_no })
			.then((supply) => {
				res.status(200).json({
					status: "success",
					// "message":
					data: supply,
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "error",
					data: err,
				});
			});
	} catch (err) {
		next(new AppError(err, 500));
	}
});
