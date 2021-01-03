const express = require('express');
const templateController = require('../controllers/templateController.js');

const router = express.Router();

router.get('/', templateController.getTemplates);

module.exports = router;
