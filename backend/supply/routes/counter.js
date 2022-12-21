const express = require('express')
const router = express.Router()

const counterController = require('../controllers/counter')
const authController = require('../controllers/auth');

router.post('/entry', authController.protect, authController.restrictTo('admin'), counterController.counterEntry);

module.exports = router