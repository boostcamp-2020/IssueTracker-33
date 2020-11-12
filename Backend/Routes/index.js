const router = require('express').Router();
const labelRouter = require('./labelRoute');
const milestoneRouter = require('./milestoneRoute');
const userRouter = require('./userRoute');
const issueRoute = require('./issueRoute');
const imageRoute = require('./imageRoute');
const commentRoute = require('./commentRoute');

router.use('/labels', labelRouter);
router.use('/milestones', milestoneRouter);
router.use('/users', userRouter);
router.use('/issues', issueRoute);
router.use('/images', imageRoute);
router.use('/comments', commentRoute);

module.exports = router;
