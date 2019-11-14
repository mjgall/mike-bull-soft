const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../config/db/mysql').pool;
const getUserByGoogleId = require('../queries/getUserByGoogleId');
const getUserByEmailAddress = require('../queries/getUserByEmailAddress');
const createUser = require('../queries/insertUser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

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
        console.log({ passportjs41: user });
        if (user) {
          done(null, user);
        } else if (!user) {
          try {
            const user = await createUser({
              service_id: profile.id,
              password: null,
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
      } catch (error) {
        throw error;
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: 'email', password: 'password', passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await getUserByEmailAddress(username).catch(err => {
          console.log(err);
        });

        if (user && user.password) {
          console.log(password, user.password);
          if (
            await bcrypt.compare(password, user.password).catch(e => {
              console.log(e);
            })
          ) {
            done(false, user, { message: 'redirect' });
          } else {
            done(false, null, { message: 'Incorrect password.' });
          }
        } else if (!user) {
          try {
            done(false, null, { message: 'No user found.' });
          } catch (error) {
            throw error;
          }
        } else {
          //already exists from oauth login
          done(false, null, { message: 'Should log in with Google' });
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
      //find if username (email) exists already. If it does, call done(null, user). If it does not, create new user, then call done(null, user).
    }
  )
);
