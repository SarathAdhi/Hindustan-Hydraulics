const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");
const authController = require("../controllers/auth");

router.get(
  "/all",
  authController.protect,
  authController.restrictTo("admin"),
  orderController.getOrders
);