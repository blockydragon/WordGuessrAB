const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/change-password', userController.changePassword);
router.post('/remove', userController.removeUser);
router.post('/login', userController.loginUser);

module.exports = router;
