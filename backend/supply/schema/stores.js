const mongoose = require("mongoose");
const validator = require("validator");

const storeEntrySchema = new mongoose.Schema({
  store: {
    type: String,
    required: [true, "Please enter a store name!"],
    trim: true,
    enu: ["smc", "general", "instrumentation", "hydraulics", "hose"],
  },
  doc_type: {
    type: String,
    required: [true, "Please enter a document type!"],
    enum: ["so_no", "proforma_no", "dc_no", "uhp_dc_no", "sam_dc_no"],
    trim: true,
    // unique: true
  },
  doc_no: {
    type: String,
    required: [true, "Please enter a document number!"],
    trim: true,
    // unique: true //TODO: Check if this should be unique
  },
  doc_date: {
    type: Date,
    required: [true, "Please enter a document date!"],
  },
  customer_name: {
    type: String,
    required: [true, "Please enter a customer name!"],
  },
  po_no: {
    type: String,
    required: [true, "Please enter a P.O. number!"],
    trim: true,
  },
  po_date: {
    type: Date,
    required: [true, "Please enter a P.O. date!"],
  },
  supply: {
    type: String,
    required: [true, "Please enter a supply name!"],
    trim: true,
    enum: ["part", "full"],
  },
  ready: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // ready_to_bill: {
  //     type: Boolean,
  //     default: false
  // }
});
module.exports = storeEntrySchema;
module.exports = mongoose.model("Supply-Store", storeEntrySchema);
