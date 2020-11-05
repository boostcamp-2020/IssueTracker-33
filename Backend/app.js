require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');
const GithubStrategy = require('passport-github').Strategy;
const router = require('./Routes/index');

const app = express();
app.use(logger('short'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors({ origin: true, credentials: true }));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ACCESS_ID,
      clientSecret: process.env.GITHUB_ACCESS_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },

    (accessToken, refreshToken, profile, done) => {
      return done(null, { username: profile.username, imgUrl: profile._json.avatar_url });
    },
  ),
);

const isLogin = (req, res, next) => {
  const cookie = req.cookies['jwt'];
  try {
    jwt.verify(cookie, 'secretkey');
    next();
  } catch (err) {
    res.status(401).json();
  }
};

app.use('/api/v1', isLogin, router);
app.get('/auth/github', passport.authenticate('github', { session: false }));
app.get('/auth/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const encodedToken = jwt.sign(req.user, 'secretkey');
  res.cookie('jwt', encodedToken);
  res.redirect('http://localhost:8000/issues');
});

app.listen(3000);
