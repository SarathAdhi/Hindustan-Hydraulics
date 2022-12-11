const express = require('express');
const router = express.Router();
const storeController = require('../controllers/stores');
const authController = require('../controllers/auth');



router.put('/store', authController.protect, authController.restrictTo('admin'), storeController.entry);
router.get('/:po_no', authController.protect, authController.restrictTo('admin'), storeController.getSupplies);


module.exports = router;