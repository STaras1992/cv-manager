const express = require('express');
const cvController = require('../controllers/cvController');

const router = express.Router();

router.get('/', cvController.getCv);

module.exports = router;
