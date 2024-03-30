const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const { route } = require('..');

router.get('/profile', userController.getUserProfile);
router.delete('/profile/:id', userController.deleteUserProfile);
router.get('/', userController.getAllUsers);

module.exports = router;