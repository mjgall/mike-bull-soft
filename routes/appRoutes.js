const insertCourse = require('../lib/insertCourse');
const getCourses = require('../lib/getCourses');
const AWS = require('aws-sdk');
const polly = new AWS.Polly();

const pollyParams = {};

module.exports = app => {
  //AUTHENTICATION PROTECTION
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized Request');
    }
  };

  app.post('/api/courses', isAuthenticated, (req, res) => {
    const { title, owner_id } = req.body;
    insertCourse({ title, owner_id }, (err, course) => {
      if (err) throw errl;
      res.send(course);
    });
  });

  app.get('/api/courses', isAuthenticated, (req, res) => {
    const owner_id = req.session.passport.user;
    getCourses(owner_id, (err, courses) => {
      if (err) throw err;
      res.send(courses);
    });
  });

  app.post('/api/tts'), (req, res) => {
    const text = req.body.text;

  }
};
