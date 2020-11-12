const router = require('express').Router();
const labelController = require('../Controllers/labelController');
const validator = require('../Controllers/validator');

router.get('', labelController.getLabels);
router.post('', validator.label, labelController.postLabel);
router.delete('/:id', labelController.deleteLabel);
router.patch('/:id', validator.label, labelController.patchLabel);

module.exports = router;
