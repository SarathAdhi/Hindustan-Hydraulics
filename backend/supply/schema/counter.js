const mongoose = require("mongoose");

const counterEntrySchema = mongoose.Schema({
	counter_no_type: {
		type: String,
		required: true,
		enum: [
			"tc_bill_no",
			"proforma_no",
			"dc_no",
			"tc_note_no",
			"lc_bill_no",
			"lc_note_no",
		],
		// unique: true
	},
	counter_no: {
		type: Number,
		required: true,
		unique: true,
	},
	counter_date: {
		type: Date,
		required: true,
	},
	customer_name: {
		type: String,
		required: true,
	},
	routing: {
		type: String,
		required: true,
		enum: [
			"transport",
			"travel",
			"courier",
			"hand_delivery",
			"auto",
			"from_uhp",
			"from_sam",
		],
	},
	security_out: {
		type: Boolean,
		required: true,
		default: false,
	},
	book_register_no: {
		type: Number,
		// required: true,
		default: null,
	},
});

module.exports = counterEntryModel = mongoose.model(
	"Supply-Counter",
	counterEntrySchema
);
