const express = require('express');
const cvController = require('../controllers/cvController');

const router = express.Router();

router.get('/', cvController.getAllCv);
router.post('/', cvController.createCv);
router.delete('/:id', cvController.deleteCv);

module.exports = router;
