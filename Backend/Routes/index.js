const express = require('express')
const router = express.Router()
const LabelRouter = require('./labels')
const MilestoneRouter = require('./milestones')
const UserRouter = require('./users')

router.use('/labels',LabelRouter)
router.use('/milestones',MilestoneRouter)
router.use('/users',UserRouter)

module.exports = router

