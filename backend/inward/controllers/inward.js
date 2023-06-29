const inwardModel = require("../schema/inward");
const AppError = require("../../utils/error");
const catchAsync = require("../../utils/catchAsync");
const EventEmitter = require("../../lib/EventEmitter.class");

exports.updateInwardDocument = (inward_doc_no, body) => {
  return new Promise((resolve, reject) => {
    orderModel
      .updateOne(
        {
          inward_doc_no: inward_doc_no,
        },
        { $set: body }
      )
      .then((result) => {
        resolve({ msg: "Update Success", data: result });
      })
      .catch((err) => {
        reject({ msg: "Update Failed", data: err });
      });
  });
};

exports.inwardEntry = (body) => {
  console.log(body);
  const store = [
    {
      store_name: "smc",
      received: false,
    },
    {
      store_name: "general",
      received: false,
    },
    {
      store_name: "instrumentation",
      received: false,
    },
    {
      store_name: "hydraulics",
      received: false,
    },
    {
      store_name: "hose",
      received: false,
    },
    {
      store_name: "tc_counter",
      received: false,
    },
    {
      store_name: "lc_counter",
      received: false,
    },
  ];

  body.store = store;

  inwardModel
    .create(body)
    .then((inward) => {
      console.log(inward);
      const eventEmitter = new EventEmitter();
      eventEmitter.emit({ event: "inwardEntry" });
      return inward;
    })
    .catch((err) => {
      return next(new AppError(err.message, 400));
    });
};

exports.getInward = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const inward = await inwardModel.find();

  res.status(200).json({
    status: "success",
    data: inward,
  });
});
