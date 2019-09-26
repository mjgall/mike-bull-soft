const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../config/db/mysql').pool;
const getUserByGoogleId = require('../queries/getUserByGoogleId');
const createUser = require('../queries/insertUser');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM users WHERE id = ${id}`,
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
    async (accessToken, refreshToken, profile, done) => {
      //check for existing user, if there is one call done with that user as the second argument, if there is not create one then call done with that user
      try {
        const user = await getUserByGoogleId(profile.id);
        if (user) {
          done(null, user);
        } else if (!user) {
          try {
            const user = await createUser({
              google_id: profile.id,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              photo_url: profile._json.picture
            });
            done(null, user);
          } catch {
            throw err;
          }
        }
      } catch {
        throw err;
      }
    }
  )
);
