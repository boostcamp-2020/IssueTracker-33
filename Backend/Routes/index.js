const express = require('express');
const router = express.Router();
const labelRouter = require('./labelRoute');
const milestoneRouter = require('./milestoneRoute');
const userRouter = require('./userRoute');
const issueRoute = require('./issueRoute');

router.use('/labels', labelRouter);
router.use('/milestones', milestoneRouter);
router.use('/users', userRouter);
router.use('/issues', issueRoute);

module.exports = router;
