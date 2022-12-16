const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/verify', authController.verifyToken);

router.post('/signup', authController.signup);

router.post('/login', authController.login);

// router.post('/hi', authController.login);



//TODO: Implement logout endpoint
// router.get('/logout', authController.logout);

//TODO: Implement reset password endpoint
// router.get('/resetPassword', authController.changePassword);

module.exports = router;