const express = require("express");
const router = express.Router();
const storeController = require("../controllers/stores");
const authController = require("../controllers/auth");

router.put(
	"/entry",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.entry
);
router.get(
	"/:doc_no",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.getSupplies
);

module.exports = router;
