const express = require("express");
const router = express.Router();
const securityController = require("../controllers/security");
const authController = require("../controllers/auth");

router.post(
  "/entry",
  authController.protect,
  authController.restrictTo("admin"),
  securityController.securityEntry
);

module.exports = router;
