const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const authController = require('../controllers/auth');


router.get('/all', authController.protect, authController.restrictTo('admin'), orderController.getOrders);
router.get('/:po_no', authController.protect, authController.restrictTo('admin'), orderController.getOrder);


router.post('/create', authController.protect, authController.restrictTo('admin'), orderController.createOrder);

router.put('/update', authController.protect, authController.restrictTo('admin'), orderController.updateOrder);

module.exports = router;