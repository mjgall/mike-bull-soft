const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../config/db/mysql').pool;
const getUserByGoogleId = require('../queries/getUserByGoogleId');
const getUserByEmailAddress = require('../queries/getUserByEmailAddress');
const insertNewLogin = require('../queries/insertNewLogin');
const createUser = require('../queries/insertUser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const trackNewLogin = userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await insertNewLogin(userId);
      resolve(response);
    } catch (error) {
      reject(error);
      throw Error(error);
    }
  });
};

passport.serializeUser((user, done) => {
  trackNewLogin(user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT users.id, users.service_id, users.first_name, users.last_name, users.email, users.photo_url, users.create_date, MAX(logins.timestamp) AS last_login FROM users INNER JOIN logins ON users.id = logins.user_id WHERE users.id = ${id}`,
      // `SELECT * FROM users WHERE id = ${id}`,
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
        throw Error(error);
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
          throw Error(err)
        });



        if (user && user.password) {
          if (
            await bcrypt.compare(password, user.password).catch(e => {
              console.log(e);
              throw Error(e)
            })
          ) {
            done(false, user, { message: 'redirect' });
          } else {
            done(false, null, { message: 'Incorrect email and/or password.' });
          }
        } else if (!user) {
          try {
            done(false, null, { message: 'Incorrect email and/or password.' });
          } catch (error) {
            throw error;
          }
        } else {
          //already exists from oauth login
          done(false, null, { message: 'Existing Google account found.' });
        }
      } catch (error) {
        console.log(error);
        throw Error(error);
      }
      //find if username (email) exists already. If it does, call done(null, user). If it does not, create new user, then call done(null, user).
    }
  )
);
