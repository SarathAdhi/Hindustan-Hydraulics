const express = require('express');
const router = express.Router();
const storeController = require('../controllers/stores');
const authController = require('../../supply/controllers/auth');

router.post('/create', authController.protect, authController.restrictTo('admin'), storeController.inwardStoresEntry);

module.exports = router;