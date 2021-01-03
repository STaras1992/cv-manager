const express = require('express');
const coverController = require('../controllers/coverController.js');

const router = express.Router();

router.get('/', coverController.getCovers);

module.exports = router;
