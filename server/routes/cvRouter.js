const express = require('express');
const cvController = require('../controllers/cvController');

const router = express.Router();

router.get('/', cvController.getAllCv);
router.get('/:id', cvController.getCv);
router.post('/', cvController.createCv);
router.delete('/:id', cvController.deleteCv);
router.patch('/', cvController.updateCv);

module.exports = router;
