const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

module.exports = () => {
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
};
