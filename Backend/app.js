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

const devID = '32f68b56a41a36049266';
const devSecret = 'de9b7c074adea9772d02a201670eb1648d9d54d1';
passport.use(
  new GithubStrategy(
    {
      clientID: devID,
      clientSecret: devSecret,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },

    (accessToken, refreshToken, profile, done) => {
      return done(null, { username: profile.username, imgUrl: profile._json.avatar_url });
    },
  ),
);

const isLogin = (req, res, next) => {
  //   console.log(req.session.passport);
  console.log(req.cookie);
  console.log(req.headers);
  //   console.log(req.headers);
  try {
    // const decodedToken = jwt.verify()
  } catch (err) {
    console.log(err);
  }
  next();
};

app.use('/api/v1', isLogin, router);

app.get('/auth/github', passport.authenticate('github', { session: false }));
app.get('/auth/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  //   console.log(req.user);
  const encodedToken = jwt.sign(req.user.username, 'secretkey');
  res.cookie('jwt', encodedToken);
  res.cookie('profile', req.user.imgUrl);
  res.redirect('http://localhost:8000/issues');
});

// app.set('port', 3000);
app.listen(3000);
