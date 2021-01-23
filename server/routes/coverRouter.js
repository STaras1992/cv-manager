const express = require('express');
const coverController = require('../controllers/coverController.js');
// const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth.js');

const router = express.Router();
router.use(protect);

router.get('/', coverController.getAllCovers);
router.get('/:id', coverController.getCover);
router.post('/', coverController.createCover);
router.delete('/:id', coverController.deleteCover);
router.patch('/', coverController.updateCover);

module.exports = router;
