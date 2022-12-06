var express = require('express');
var router = express.Router();
var Auth = require('../schema/auth');

const authController = require('../controllers/auth');

var mongoose = require('mongoose');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;