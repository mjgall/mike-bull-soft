const passport = require('passport');
const insertUser = require('../queries/insertUser');

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

  // app.post(
  //   '/auth/login',
  //   passport.authenticate('local', {
  //     successRedirect: '/home',
  //     failureRedirect: '/login'
  //   }),
  //   function(req, res) {}
  // );

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(200).send(err);
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
    res.redirect('/login');
  });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
