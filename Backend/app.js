const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(logger('short'))

app.set('port',3000)
app.listen('3000')