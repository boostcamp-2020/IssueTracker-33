require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const Routers = require('./Routes');

const app = express();
app.use(cors());
app.use(logger('short'));

app.use(Routers);

app.set('port', 3000);
app.listen('3000');
