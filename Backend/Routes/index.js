const router = require('express').Router();
const labelRouter = require('./labelRoute');
const milestoneRouter = require('./milestoneRoute');
const userRouter = require('./userRoute');
const issueRoute = require('./issueRoute');
const imageRoute = require('./imageRoute');

router.use('/labels', labelRouter);
router.use('/milestones', milestoneRouter);
router.use('/users', userRouter);
router.use('/issues', issueRoute);
router.use('/images', imageRoute);

module.exports = router;
