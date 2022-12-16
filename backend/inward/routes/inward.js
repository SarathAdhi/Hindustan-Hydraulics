const express = require('express');
const router = express.Router();
const inwardController = require('../controllers/inward');
const authController = require('../../supply/controllers/auth');

router.post('/create', authController.protect, authController.restrictTo('admin'), inwardController.inwardEntry);

module.exports = router;