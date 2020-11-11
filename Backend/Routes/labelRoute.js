const router = require('express').Router();
const labelController = require('../Controllers/labelController');

router.get('', labelController.getLabels);
router.post('', labelController.postLabel);
router.delete('/:id', labelController.deleteLabel);
router.patch('/:id', labelController.patchLabel);

module.exports = router;
