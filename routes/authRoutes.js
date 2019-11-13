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

  app.post('/auth/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });

  app.post('/auth/register', async (req, res) => {
    console.log(req.body);
    const { password, first_name, last_name, email } = req.body;
    await insertUser({
      service_id: null,
      password,
      first_name,
      last_name,
      email,
      photo_url: null
    });
    res.redirect('/');
  });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
