const express = require("express");
const router = express.Router();

const counterController = require("../controllers/counter");
const authController = require("../controllers/auth");

router.post(
	"/entry",
	authController.protect,
	authController.restrictTo("admin"),
	counterController.counterEntry
);
router.get(
	"/all",
	authController.protect,
	authController.restrictTo("admin"),
	counterController.getCounterEntries
);
router.get(
	"/:counter_no",
	authController.protect,
	authController.restrictTo("admin"),
	counterController.getCounterEntry
);

router.put(
	"/update",
	authController.protect,
	authController.restrictTo("admin"),
	counterController.updateCounterEntry
);

module.exports = router;
