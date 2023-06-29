
const express = require("express");
const router = express.Router();
const authController = require("../../supply/controllers/auth");
const dashboardController = require("../controllers/dashboard");

router.get(
    "/",
    authController.protect,
    authController.restrictTo("admin"),
    dashboardController.getInwards
);

module.exports = router;