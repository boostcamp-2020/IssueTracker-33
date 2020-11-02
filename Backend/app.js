const express = require('express');
const logger = require('morgan');
const router = require('./Routes/index');

const app = express();
app.use(logger('short'));

app.use(express.json());

app.use('/api/v1', router);

// app.set('port', 3000);
app.listen(3000);
