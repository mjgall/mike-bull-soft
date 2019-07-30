"use strict";

const express = require('express');

const cookieSession = require('cookie-session');

const passport = require('passport');

const path = require('path');

const bodyParser = require('body-parser');

const keys = require('./config/keys');

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
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client', 'build'))); //ROUTES
//AUTH

require('./routes/authRoutes')(app); //APP


require('./routes/appRoutes')(app); //SERVER RUNNING


const port = process.env.HTTP_PORT || 2000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
