exports.updateBill = catchAsync(async (req, res, next) => {
	console.log("updateBill 123", req.body);
	const { doc_no, bill_no } = req.body;
	// const query = doc_no || bill_no;
	if (doc_no) {
		console.log(1)
		const bill = await billingModel.findOne({ doc_no: doc_no });
		console.log(2)
		if (!bill) {
			console.log(3)
			return next(new AppError("Bill Not Found", 400));
		}
	}
	if (bill_no) {
		console.log(4)
		const bill = await billingModel.findOne({ bill_no: bill_no });
		console.log(5)
		if (!bill) {
			console.log(6)
			return next(new AppError("Invalid Bill Number", 400));
		}
		if (bill.doc_no != doc_no) {
			console.log(7)
			return next(
				new AppError("Bill no did not match with doc no!!", 400)
			);
		}
	}

	console.log(8)
	getAllowedFields(req, res, next);
	console.log(9)
	billingModel
		.updateOne(
			{ doc_no: doc_no },
			{
				order_status: req.body.order_status,
				routing: req.body.routing,
				bill_ready: req.body.bill_ready,
			}
		)
		.then((result) => {
			console.log(10)
			updateOrderDocument(doc_no, {
				bill_ready: req.body.bill_ready,
				routing: req.body.routing,
				order_status: req.body.order_status,
			});
			console.log(11)
			res.status(200).json({
				status: "success",
				data: result,
			});
		})
		.catch((err) => {
			console.log(12)
			console.error(err);
			console.log(13)
			res.status(500).json({
				status: "error",
				message: err,
			});
		});
});