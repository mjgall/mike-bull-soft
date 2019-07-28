const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../config/db/mysql').pool;
const getUserByGoogleId = require('../lib/getUserByGoogleId');
const createUser = require('../lib/insertUser');

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM users WHERE googleId = ${id}`,
      (err, users, fields) => {
        if (err) throw err;
        done(null, users[0]);
      }
    );
    connection.release();
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: `/auth/google/callback`,
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //check for existing user, if there is one call done with that user as the second argument, if there is not create one then call done with that user
      getUserByGoogleId(profile.id, (err, user) => {
        if (user) {
          done(null, user);
        } else if (!user) {
          createUser(
            {
              googleId: profile.id,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              photo_url: profile._json.picture
            },
            (err, user) => {
              if (err) throw err;
              done(null, user);
            }
          );
        }
      });
    }
  )
);
