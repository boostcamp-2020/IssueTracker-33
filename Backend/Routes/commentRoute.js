const router = require('express').Router();
const { patchComment, postComment } = require('../Controllers/commentController');
const validator = require('../Controllers/validator');

router.post('/', validator.commentCreate, postComment);
router.patch('/:commentId', validator.commentUpdate, patchComment);

module.exports = router;
