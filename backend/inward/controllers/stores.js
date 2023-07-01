const storeInwardModel = require("../schema/stores");
const inwardModel = require("../schema/inward");
const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const Utils = require("../../utils/validator");

const { inwardEntry } = require("./inward");

const EventEmitter = require("../../lib/EventEmitter.class");

exports.inwardStoresEntry = catchAsync(async (req, res, next) => {
	const inward_details = await inwardModel.findOne({
		doc_no: req.body.doc_no,
	});
	if (!inward_details) {
		const inward = await inwardEntry(req.body);
		console.log("inward", inward);
	}

	storeInwardModel
		.findOne({
			doc_no: req.body.doc_no,
			store: req.body.store,
		})
		.then((store) => {
			if (store) {
				return next(
					new AppError(
						"Store entry already exists for " +
							req.body.store +
							" store!",
						400
					)
				);
			}
		});

	storeInwardModel
		.findOne({
			doc_no: req.body.doc_no,
		})
		.then((store) => {
			console.log("Store", store);
			if (!store) {
				return 0;
			}
			if (store.doc_type != req.body.doc_type) {
				return next(new AppError("Document type mismatch!", 400));
			}
		});

	const { store } = req.body;

	storeInwardModel
		.create({
			store: store,
			supplier_name: req.body.supplier_name,
			doc_type: req.body.doc_type,
			doc_no: req.body.doc_no,
			doc_date: req.body.doc_date,
			received: req.body.received,
		})
		.then((s) => {
			console.log("Updating Inward Document");
			inwardModel
				.updateOne(
					{
						doc_no: req.body.doc_no,
						store: { $elemMatch: { store_name: req.body.store } },
					},
					{
						$set: {
							"store.$.received": req.body.received,
							materials_received: req.body.received,
							security_inward: true,
						},
					}
				)
				.then((result) => {
					const eventEmitter = new EventEmitter();
					eventEmitter.emit({ event: "storeInwardEntry" });
					res.status(201).json({
						status: "success",
						data: result,
					});
				})
				.catch((err) => {
					next(new AppError(err.message, 400));
				});
		})
		.catch((err) => {
			next(new AppError(err.message, 400));
		});
});
