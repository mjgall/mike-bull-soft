const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./services/passport');

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    signed: true,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//AUTHENTICATION ROUTES
require('./routes/authRoutes')(app);

//APP ROUTES
require('./routes/appRoutes')(app);

//IF DEPLOYED TO PRODUCTION
if (process.env.ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//START SERVER
const port = process.env.HTTP_PORT || 2000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
