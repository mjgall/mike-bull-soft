"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var cookieSession = require('cookie-session');

var passport = require('passport');

var path = require('path'); // const mysql = require('mysql');


var db = require('./config/db/mysql').pool;

var bodyParser = require('body-parser');

var getUser = require('./lib/getUserByGoogleId');

var createUser = require('./lib/insertUser');

var keys = require('./config/keys');

require('./services/passport');

var app = express();
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
app.use(express["static"](path.join(__dirname, 'client', 'build'))); //ROUTES
//AUTH

require('./routes/authRoutes')(app);

app.post('/api/testdb', function (req, res) {
  var _req$body = req.body,
      googleId = _req$body.googleId,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      email = _req$body.email,
      photo_url = _req$body.photo_url;
  createUser({
    googleId: googleId,
    first_name: first_name,
    last_name: last_name,
    email: email,
    photo_url: photo_url
  }, function (err, data) {
    if (err) {
      res.send(err);
    }

    res.send(data);
  });
});
app.get('/api/gettest',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db.getConnection(function (err, connection) {
              if (err) {
                res.send(err);
              }

              connection.query("SELECT * FROM users WHERE id = ".concat(req.body.id), function (err, results, fields) {
                if (err) {
                  res.send("There was an error: ".concat(err));
                } else {
                  res.send(results);
                }
              });
              connection.release();
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/api/anothertest',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.body.id;
            console.log(id);
            db.getConnection(function (err, connection) {
              if (err) throw err;
              connection.query("SELECT * FROM users WHERE id = ".concat(id), function (err, users, fields) {
                if (err) throw err;
                res.json(users[0].id);
              });
              connection.release();
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/api/onemoretest',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getUser('123', function (err, data) {
              if (err) throw err;
              res.send(data);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //SERVER RUNNING

var port = process.env.HTTP_PORT || 2000;
app.listen(port, function () {
  console.log("Running on http://localhost:".concat(port));
});
