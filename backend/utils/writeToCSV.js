const Excel = require("exceljs");
const fs = require("fs");
const catchAsync = require("./catchAsync");
// const OrderController = require('..supply/controllers/order');
const OrderModel = require("../supply/schema/orders");

exports.writeToCSV = catchAsync(async (req, res, next) => {
  const query = OrderModel.find();
  const orders = await query.select("-__v -_id -store");
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Orders");
  worksheet.columns = [
    { header: "S No", key: "s_no" },
    { header: "Date", key: "date" },
    { header: "Purchase Order No", key: "purchase_order_no" },
    { header: "Customer Name", key: "customer_name" },
    { header: "Counter No", key: "counter_no" },
    { header: "Ready", key: "ready" },
    { header: "Ready to Bill", key: "ready_to_bill" },
    { header: "Bill Ready", key: "bill_ready" },
    { header: "Bill No", key: "bill_no" },
    { header: "Routing", key: "routing" },
    { header: "Security Out", key: "security_out" },
    { header: "Reg No", key: "reg_no" },
  ];
  worksheet.columns.forEach((column) => {
    column.width = column.header.length < 12 ? 12 : column.header.length;
  });
  worksheet.getRow(1).font = { bold: true };
  orders.forEach((order) => {
    let new_order = Object.assign({}, order);
    console.log(order.ready ? "Yes" : "No");
    order.ready = order.ready ? "Yes" : "No";
    order.ready_to_bill = order.ready_to_bill ? "Yes" : "No";
    order.bill_ready = order.bill_ready ? "Yes" : "No";
    order.security_out = order.security_out ? "Yes" : "No";
    console.log(order);
    worksheet.addRow(order);
  });
  workbook.xlsx.writeFile("Orders.xlsx");

  res.status(200).json({
    status: "success",
    data: orders,
  });
});
