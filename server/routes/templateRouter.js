const express = require('express');
const templateController = require('../controllers/templateController.js');
const { protect } = require('../middlewares/auth.js');

const router = express.Router();
router.use(protect);

router.get('/', templateController.getAllTemplates);
router.post('/', templateController.createTemplate);
router.delete('/:id', templateController.deleteTemplate);
router.patch('/', templateController.updateTemplate);

module.exports = router;
