require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

const router = require('./Routes/index');
const passportConfig = require('./Passport');
const { tokenAllocate, tokenCheck } = require('./Passport/token');

const app = express();
app.use(logger('short'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors({ origin: true, credentials: true }));

passportConfig();

app.use('/api/v1', tokenCheck, router);
app.get('/auth/github', passport.authenticate('github', { session: false }));
app.get('/auth/github/callback', passport.authenticate('github', { session: false }), tokenAllocate);

console.log(process.env.NODE_ENV);

app.listen(3000);
