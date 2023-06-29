const storeInwardModel = require("../schema/stores");
const inwardModel = require("../schema/inward");
const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const Utils = require("../../utils/validator");

const { inwardEntry } = require("./inward");

const EventEmitter = require("../../lib/EventEmitter.class");

exports.inwardStoresEntry = catchAsync(async (req, res, next) => {
  const { store, received, doc_type, doc_no, doc_date, supplier_name } =
    req.body;

  if (
    !store ||
    !received ||
    !doc_type ||
    !doc_no ||
    !doc_date ||
    !supplier_name
  ) {
    return next(new AppError("Please provide all the details!", 400));
  }

  const inward_details = await inwardModel.findOne({ doc_no });
  if (!inward_details) {
    inwardEntry(req.body);
  }

  const check = Utils.verify_store_inward_scheme(
    store,
    supplier_name,
    doc_type,
    doc_no,
    doc_date,
    received
  );
  if (check) {
    return next(new AppError(check, 400));
  }

  storeInwardModel
    .updateOne(
      { doc_no, store: store },
      {
        store: store,
        supplier_name: req.body.supplier_name,
        doc_type: req.body.doc_type,
        doc_no: req.body.doc_no,
        doc_date: req.body.doc_date,
        received: req.body.received,
      },
      { upsert: true }
    )
    .then((s) => {
      inwardModel
        .updateOne(
          {
            doc_no: req.body.doc_no,
            store: { $elemMatch: { store_name: store } },
          },
          {
            $set: {
              "store.$.received": req.body.received,
              materials_received: req.body.received,
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
          console.log(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        status: "error",
        data: err,
      });
    });
});
