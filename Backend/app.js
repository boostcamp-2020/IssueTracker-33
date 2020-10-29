const express = require('express')
const logger = require('morgan')

const app = express()
app.use(logger('short'))

app.set('port',3000)
app.listen('3000')