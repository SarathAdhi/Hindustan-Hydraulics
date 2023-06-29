const express = require("express");
const router = express.Router();
const securityController = require("../controllers/security");
const authController = require("../../supply/controllers/auth");

router.post(
  "/create",
  authController.protect,
  authController.restrictTo("admin"),
  securityController.inwardSecurityEntry
);

module.exports = router;
