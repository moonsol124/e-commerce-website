const express = require('express');
const router = express.Router();
const async = require("async");
const User = require('../models/user');
const UserController = require('../controllers/userController');

router.get('/users/', UserController.get_users);
router.post('/user/create', UserController.create);
router.get('/user/:userId', UserController.get_user);
router.put('/user/:userId/update', UserController.update);
router.delete('/user/:userId/delete', UserController.delete);
router.post('/user/login', UserController.login);

module.exports = router;