const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

// Initialize auto-increment plugin
autoIncrement.initialize(mongoose.connection);

const inwardSchema = mongoose.Schema({
  s_no: {
    type: Number,
    required: [true, "Please enter a serial number!"],
    trim: true,
    unique: true,
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
  date: {
    type: Date,
    default: Date.now,
  },
  supplier_name: {
    type: String,
    required: [true, "Please enter a supplier name!"],
    trim: true,
  },
  store: {
    type: Array,
    default: () => ({}),
  },
  materials_received: {
    type: Boolean,
    default: false,
  },
  security_inward: {
    type: Boolean,
    default: false,
  },
  inward_reg_no: {
    type: Number,
    trim: true,
    default: null,
  },
});

inwardSchema.plugin(autoIncrement.plugin, {
  model: "Inward-materials",
  field: "s_no",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Inward-materials", inwardSchema);
