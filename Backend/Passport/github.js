const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const { db } = require('../Models/dbPool');

module.exports = () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_ACCESS_ID,
        clientSecret: process.env.GITHUB_ACCESS_SECRET,
        callbackURL: `${process.env.PROD_API_SERVER}:3000/auth/github/callback`,
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const userValues = [profile.username, 'OAUTH_GITHUB', profile._json.avatar_url];
          const insertSql = `INSERT INTO users(username,password,imageLink) Values(?,?,?)`;
          await db.execute(insertSql, userValues);
        } catch (err) {
          if (err.errno !== 1062) {
            //unique value duplication error
            done(err);
          }
        }

        const selectSql = `SELECT id,username,imageLink FROM users WHERE username='${profile.username}'`;
        const [[{ id, username, imageLink }]] = await db.execute(selectSql);
        return done(null, { userId: id, username: username, imageLink: imageLink });
      },
    ),
  );
};
