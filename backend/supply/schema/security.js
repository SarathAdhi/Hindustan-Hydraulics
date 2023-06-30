const mongoose = require("mongoose");

const securityEntrySchema = mongoose.Schema({
	doc_no: {
		type: String,
		// required: true,
		// unique: true
	},
	counter_no: {
		type: Number,
	},
	security_out: {
		type: Boolean,
		required: true,
	},
	book_register_no: {
		type: Number,
		required: true,
		unique: true,
	},
});

module.exports = securityEntryModel = mongoose.model(
	"Supply-Security",
	securityEntrySchema
);
