const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const messageController = require('../controllers/message.controller'); // Import the controller for handling messages

const router = Router();

// Authentication routes
router.get('/signup_user', authController.signup_get);
router.post('/signup_user', authController.signup_post);
router.get('/signup_vl', authController.signup_get_vl);
router.post('/signup_vl', authController.signup_post_vl);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);


module.exports = router;
