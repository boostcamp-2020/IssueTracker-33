const router = require('express').Router();
const issueRoute = require('./issueRoute');

router.use('/issues', issueRoute);
