const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
// const mysql = require('mysql');
const db = require('./config/db/mysql').pool;
const bodyParser = require('body-parser');
const getUser = require('./lib/getUserByGoogleId');
const createUser = require('./lib/insertUser');
const keys = require('./config/keys');

require('./services/passport');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] }))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client', 'build')));

//ROUTES

//AUTH
require('./routes/authRoutes')(app);

app.post('/api/testdb', (req, res) => {
  const { googleId, first_name, last_name, email, photo_url } = req.body;
  createUser(
    {
      googleId,
      first_name,
      last_name,
      email,
      photo_url
    },
    (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    }
  );
});

app.get('/api/gettest', async (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      res.send(err);
    }
    connection.query(
      `SELECT * FROM users WHERE id = ${req.body.id}`,
      (err, results, fields) => {
        if (err) {
          res.send(`There was an error: ${err}`);
        } else {
          res.send(results);
        }
      }
    );
    connection.release();
  });
});

app.get('/api/anothertest', async (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM users WHERE id = ${id}`,
      (err, users, fields) => {
        if (err) throw err;
        res.json(users[0].id);
      }
    );
    connection.release();
  });
});

app.get('/api/onemoretest', async (req, res) => {
  await getUser('123', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

//SERVER RUNNING
const port = process.env.HTTP_PORT || 2000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
