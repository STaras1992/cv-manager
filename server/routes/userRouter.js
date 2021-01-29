const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/auth', authController.checkAuth);

//TODO user routes CRUD

module.exports = router;
