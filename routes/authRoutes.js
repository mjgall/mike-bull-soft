const passport = require('passport');
const insertUser = require('../queries/insertUser');
const crypto = require('crypto');
const { promisify } = require('util');
const getUserByEmail = require('../queries/getUserByEmailAddress');
const insertNewReset = require('../queries/insertNewReset');
const sendEmail = require('../services/aws-ses');
const getUserByResetToken = require('../queries/getUserByResetToken');
const updatePassword = require('../queries/updatePassword');
const getUserById = require('../queries/getUserById');
const bcrypt = require('bcryptjs');

module.exports = app => {
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(400).send({ error: 'Something went wrong.' });
      }
      if (!user) {
        return res.status(200).send(info);
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).send(info);
      });
    })(req, res, next);
  });

  app.post('/auth/register', async (req, res) => {
    const { password, first_name, last_name, email } = req.body;
    await insertUser({
      service_id: null,
      password,
      first_name,
      last_name,
      email,
      photo_url: null
    });
    res.status(200).send({ message: 'success' });
  });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get('/api/current_user', async (req, res) => {
    res.send(req.user);
  });

  app.post('/auth/resetpassword', async (req, res) => {
    const { token, userId, password, currentPassword } = req.body;
   
    if (token) {
      const user = await getUserByResetToken(token);
      const body = `<p>Hi ${user.first_name},</p><p>You have successfully updated your password on your account. Your privacy is important to us. If you did not make this change, please contact Support at <a href="support@llt.gllghr.io">support@llt.gllghr.io</a>.</p>`;
      if (!user) {
        res.send({
          error: true,
          success: false,
          message: 'No valid token found.'
        });
      } else if (parseInt(user.expiry) < Date.now()) {
        res.send({ error: true, success: false, message: 'Token expired' });
      } else {
        const newUser = await updatePassword(userId, password);
        await sendEmail(
          user.email,
          'Your password has been updated at llt.gllghr.io',
          body
        );
        res.send({
          error: false,
          success: true,
          message: 'Password updated',
          newUser
        });
      }
    } else if (currentPassword) {
      const user = await getUserById(userId);
      const body = `<p>Hi ${user.first_name},</p><p>You have successfully updated your password on your account. Your privacy is important to us. If you did not make this change, please contact Support at <a href="support@llt.gllghr.io">support@llt.gllghr.io</a>.</p>`;
      if (!user.service_id) {
        if (
          await bcrypt.compare(currentPassword, user.password).catch(e => {
            console.log(e);
            throw Error(e);
          })
        ) {
          const newUser = await updatePassword(userId, password);
          await sendEmail(
            user.email,
            'Your password has been updated at llt.gllghr.io',
            body
          );
          res.send({
            error: false,
            success: true,
            message: 'Password updated.',
            newUser
          });
        } else {
          res.send({
            error: false,
            success: false,
            message: 'Incorrect current password.'
          });
        }
      } else {
        res.send({
          error: false,
          success: false,
          messgae: "Can't reset an OAuth user's password."
        });
      }
    }
  });

  app.post('/auth/checktoken', async (req, res) => {
    const token = req.body.token;

    const user = await getUserByResetToken(token);

    if (!user) {
      res.send({
        error: true,
        success: false,
        message: 'No valid token found.'
      });
    } else if (parseInt(user.expiry) < Date.now()) {
      res.send({ error: true, success: false, message: 'Token expired' });
    } else {
      res.send({ error: false, success: true, message: 'Success', user });
    }
  });

  app.post('/auth/reset', async (req, res) => {
    const { email, domain } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      res.send({
        error: true,
        message: 'No user exists.'
      });
    } else if (user.service_id) {
      res.send({
        error: true,
        message: "Can't reset password for an oauth user."
      });
    } else {
      const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
      const expiry = Date.now() + 3600000;
      await insertNewReset(user.id, token, expiry);
      const subject = 'Reset your password';
      const body = `<p>We’ve received a request to reset the password for your account at llt.gllghr.io. To reset it, simply click here or on the button below.</p><p>The link expires in 60 minutes. If you did not make this request, you may safely ignore this message. Your account remains safe and your current password will not be changed.</p><p>
      </br>
      <p>${domain}/reset/${token}</p>`;

      try {
        const response = await sendEmail(email, subject, body);
        res.send({ error: false, message: 'Password reset email sent.' });
      } catch (error) {
        res.send({ error: true, message: error });
        console.log(error);
        throw new Error(error);
      }

      res.send({ error: false });
    }
  });
};
