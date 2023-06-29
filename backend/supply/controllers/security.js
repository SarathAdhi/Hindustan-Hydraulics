const orderModel = require("../schema/orders");
const securityEntryModel = require("../schema/security");

const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const { updateOrderDocument } = require("./orders");
const EventEmitter = require("../../lib/EventEmitter.class");

exports.securityEntry = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  let security;
  const { type } = req.body;
  if (type == "counter") {
    const { counter_no } = req.body;
    const counter = await counterEntryModel.findOne({
      counter_no,
    });
    if (!counter) {
      return next(new AppError("Counter Entry does not exist!", 400));
    }

    security = await securityEntryModel.findOne({
      counter_no: req.body.counter_no,
    });
  } else if (type == "store") {
    const order = await orderModel.findOne({ doc_no: req.body.doc_no });
    // console.log(order)
    if (!order) {
      return next(new AppError("Invalid doc number!", 400));
    }
    security = await securityEntryModel.findOne({ doc_no: req.body.doc_no });
  }

  console.log(security);
  if (security) {
    return next(
      new AppError("Security Entry already generated for this order!", 400)
    );
  }

  const test = await securityEntryModel.findOne({
    book_register_no: req.body.book_register_no,
  });

  if (test) {
    return next(
      new AppError(
        "Security Entry already generated for this book register number!",
        400
      )
    );
  }

  securityEntryModel
    .create(req.body)
    .then((data) => {
      const { security_out, book_register_no } = req.body;
      const reg_no = book_register_no;
      if (type == "counter") {
        counterEntryModel
          .updateOne(
            {
              counter_no: req.body.counter_no,
            },
            {
              security_out: security_out,
              reg_no: reg_no,
            }
          )
          .then((result) => {
            const eventEmitter = new EventEmitter();
            eventEmitter.emit({ event: "securityEntry" });
            res.status(201).json({
              message: "success",
              data: data,
              result,
            });
          })
          .catch((err) => {
            res.status(401).json({
              status: "fail",
              error: err,
            });
          });
      } else if (type == "store") {
        orderModel
          .updateOne(
            {
              doc_no: req.body.doc_no,
            },
            {
              security_out: security_out,
              reg_no: reg_no,
            }
          )

          .then((result) => {
            const eventEmitter = new EventEmitter();
            eventEmitter.emit({ event: "securityEntry" });
            res.status(201).json({
              message: "success",
              data: data,
              result,
            });
          })
          .catch((err) => {
            res.status(401).json({
              status: "fail",
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: "fail",
        error: err,
      });
    });
});
