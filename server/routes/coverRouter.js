const express = require('express');
const coverController = require('../controllers/coverController.js');

const router = express.Router();

router.get('/', coverController.getAllCovers);
router.get('/:id', coverController.getCover);
router.post('/', coverController.createCover);
router.delete('/:id', coverController.deleteCover);
router.patch('/', coverController.updateCover);

module.exports = router;
