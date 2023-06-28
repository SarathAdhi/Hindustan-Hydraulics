const mongoose = require("mongoose");

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

module.exports = mongoose.model("Inward-Store", storeInwardSchema);
