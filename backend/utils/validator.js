const AppError = require("../utils/error");
const mongoose = require("mongoose");
const orderModel = require("../supply/schema/orders");

const storeSchema = mongoose.Schema({
	store_name: {
		type: String,
		enum: ["smc", "general", "instrumentation", "hydraulics", "hose"],
		required: [true, "Please enter a store name!"],
		trim: true,
	},
	supply: {
		type: String,
		enum: ["part", "full", "none"],
		default: "none",
	},
});

const storeModel = mongoose.model("check", storeSchema);

const storeInwardSchema = mongoose.Schema({
	store: {
		type: String,
		required: [true, "Please enter a store name!"],
		trim: true,
		enu: ["smc", "general", "instrumentation", "hydraulics", "hose"],
	},
	supplier_name: {
		type: String,
		required: [true, "Please enter a customer name!"],
	},
	doc_type: {
		type: String,
		required: [true, "Please enter a document type!"],
		enum: [
			"bill_no",
			"dc_no",
			"note_no",
			"uhp_dc_no",
			"sam_dc_no",
			"return_invoice_no",
			"service_materials_no",
		],
		trim: true,
	},
	doc_no: {
		type: String,
		required: [true, "Please enter a document number!"],
		trim: true,
	},
	doc_date: {
		type: Date,
		required: [true, "Please enter a document date!"],
	},
	received: {
		type: Boolean,
		default: false,
		required: [true, "Please enter a received status!"],
	},
});

const storeInwardModel = mongoose.model("check1", storeInwardSchema);

exports.verify_store_scheme = (store, supply) => {
	try {
		const check = new storeModel({
			store_name: store,
			supply: supply,
		});
		let error = check.validateSync();
		if (error) {
			console.error(error);
			return error;
		}
		return false;
	} catch (err) {
		return err;
	}
};

exports.verify_store_inward_scheme = (
	store,
	supplier_name,
	doc_type,
	doc_no,
	doc_date,
	received
) => {
	try {
		const check = new storeInwardModel({
			store: store,
			supplier_name: supplier_name,
			doc_type: doc_type,
			doc_no: doc_no,
			doc_date: doc_date,
			received: received,
		});
		let error = check.validateSync();
		if (error) {
			console.error(error);
			return error;
		}
		return false;
	} catch (err) {
		return err;
	}
};

const counterEntryScheme = mongoose.Schema({
	counter_no_type: {
		type: String,
	},
});
