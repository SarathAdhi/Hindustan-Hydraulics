const express = require('express');
const router = express.Router();
const billing = require('../controllers/billing');
const authController = require('../controllers/auth');



router.post('/generate', authController.protect, authController.restrictTo('admin'), billing.createBill);

//TODO: When updating bill not ready status ensure data consistency with 2 collections 
router.put('/update', authController.protect, authController.restrictTo('admin'), billing.updateBill);
router.put('/update/bill_no', authController.protect, authController.restrictTo('admin'), billing.updateBillNumber);

module.exports = router;