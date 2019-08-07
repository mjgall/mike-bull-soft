"use strict";

const express = require('express');

const cookieSession = require('cookie-session');

const passport = require('passport');

const path = require('path');

const bodyParser = require('body-parser');

const keys = require('./config/keys');

const polly = require('./services/polly');

require('./services/passport');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session()); //ROUTES
//AUTH

require('./routes/authRoutes')(app); //APP


require('./routes/appRoutes')(app); //CONDITIONS IF DEPLOYED TO PRODUCTION


if (!process.env.TERM_PROGRAM !== 'vscode') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static(path.join(__dirname, 'client', 'build'))); // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} //SERVER RUNNING


const port = process.env.HTTP_PORT || 2000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
