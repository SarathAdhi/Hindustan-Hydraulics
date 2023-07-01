const storeModel = require("../schema/stores");
const orderModel = require("../schema/orders");
const AppError = require("../../utils/error");
const Utils = require("../../utils/validator");
const EventEmitter = require("../../lib/EventEmitter.class");
const catchAsync = require("../../utils/catchAsync");

getAllowedFieldsForStore = (req) => {
	const allowedFields = [
		"doc_date",
		"po_date",
		"supply",
		"ready",
		"ready_to_bill",
	];

	const filteredBody = {};
	Object.keys(req.body).forEach((el) => {
		if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
	});

	req.body = filteredBody;
	return req.body;
};

exports.getStores = catchAsync(async (req, res, next) => {
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

exports.getAllStore = catchAsync(async (req, res, next) => {
	const stores = await storeModel.find();
	res.status(200).json({
		status: "success",
		count: stores.length,
		data: stores,
	});
});

exports.getUnBilledStores = catchAsync(async (req, res, next) => {
	const orders = await orderModel.find({
		ready_to_bill: true,
		bill_ready: false,
	});

	if (orders.length === 0) {
		res.status(200).json({
			status: "success",
			count: 0,
			data: [],
		});
		return;
	}

	const doc_nos = orders.map((order) => order.doc_no);

	const stores = await storeModel.find({ doc_no: { $in: doc_nos } });
	res.status(200).json({
		status: "success",
		count: stores.length,
		data: stores,
	});
});

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

	if (data && data.doc_type != req.body.doc_type) {
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

exports.updateStore = catchAsync(async (req, res, next) => {
	const { doc_no, store } = req.query;
	if (!doc_no) {
		return next(new AppError("Please provide Doc number", 400));
	}

	if (!store) {
		return next(new AppError("Please provide Store name", 400));
	}

	req.body = getAllowedFieldsForStore(req);

	storeModel
		.updateOne(
			{
				doc_no: doc_no,
				store: store,
			},
			{
				$set: {
					doc_date: req.body.doc_date,
					po_date: req.body.po_date,
					supply: req.body.supply,
					ready_to_bill: req.body.ready_to_bill,
					ready: req.body.ready_to_bill,
				},
			}
		)
		.then((store_result) => {
			orderModel
				.updateOne(
					{
						doc_no: doc_no,
						store: { $elemMatch: { store_name: store } },
					},
					{
						$set: {
							doc_date: req.body.doc_date,
							po_date: req.body.po_date,
							"store.$.supply": req.body.supply,
							ready_to_bill: req.body.ready_to_bill,
							ready: req.body.ready_to_bill,
						},
					}
				)
				.then((result) => {
					const eventEmitter = new EventEmitter();
					eventEmitter.emit({ event: "storeEntry" });
					res.status(200).json({
						status: "success",
						message: "Store Entry updated successfully!",
						data: result,
						store_result: store_result,
					});
				});
		})
		.catch((err) => {
			return next(new AppError(err, 400));
		});
});

exports.deleteStore = catchAsync(async (req, res, next) => {
	console.log(req.query);
	if (!req.query.doc_no) {
		return next(new AppError("Please provide Doc number", 400));
	}

	if (!req.query.store) {
		return next(new AppError("Please provide Store name", 400));
	}

	const { store } = req.query;

	const { ready_to_bill, ready } = await storeModel
		.find({
			doc_no: req.query.doc_no,
		})
		.then((result) => {
			let foundDocumentWithReadyToBill = false;
			let foundDocumentWithReady = false;

			result.forEach((document) => {
				console.log(document);
				if (document.ready_to_bill === true) {
					foundDocumentWithReadyToBill = true;
				}

				if (document.ready === true) {
					foundDocumentWithReady = true;
				}
			});

			console.log(foundDocumentWithReady, foundDocumentWithReadyToBill);
			if (result.length === 1) {
				foundDocumentWithReady = false;
				foundDocumentWithReadyToBill = false;
			}

			console.log(foundDocumentWithReadyToBill, foundDocumentWithReady);

			return {
				ready_to_bill: foundDocumentWithReadyToBill,
				ready: foundDocumentWithReady,
			};
		});

	storeModel
		.deleteOne({
			doc_no: req.query.doc_no,
			store: store,
		})
		.then((del_result) => {
			orderModel
				.updateOne(
					{
						doc_no: req.query.doc_no,
						store: { $elemMatch: { store_name: store } },
					},
					{
						$set: {
							"store.$.supply": "none",
							ready_to_bill: ready_to_bill,
							ready: ready,
						},
					}
				)
				.then((result) => {
					const eventEmitter = new EventEmitter();
					eventEmitter.emit({ event: "deleteStore" });
					res.status(200).json({
						status: "success",
						message: "Store Entry deleted successfully!",
						data: result,
						del_result: del_result,
					});
				});
		})
		.catch((err) => {
			return next(new AppError(err, 400));
		});
});
