const express = require('express');
const mailController = require('../controllers/mailController.js');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth.js');

const router = express.Router();
router.use(protect);

router.post('/', mailController.sendMail);

module.exports = router;
