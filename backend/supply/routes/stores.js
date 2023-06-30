const express = require("express");
const router = express.Router();
const storeController = require("../controllers/stores");
const authController = require("../controllers/auth");

router.get(
	"/unbilled",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.getUnBilledStores
);

router.get(
	"/:doc_no",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.getStores
);

router.get(
	"/",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.getAllStore
);

router.post(
	"/entry",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.entry
);
router.put(
	"/update",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.updateStore
);

router.delete(
	"/delete",
	authController.protect,
	authController.restrictTo("admin"),
	storeController.deleteStore
);

module.exports = router;
