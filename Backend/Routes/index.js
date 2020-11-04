const router = require('express').Router();
const issueRoute = require('./issueRoute');
const imageRoute = require('./imageRoute');

router.use('/issues', issueRoute);
router.use('/images', imageRoute);

module.exports = router;
