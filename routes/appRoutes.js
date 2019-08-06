const insertCourse = require('../lib/insertCourse');
const getCourses = require('../lib/getCourses');
const getCourse = require('../lib/getCourse');
const polly = require('../services/polly');

module.exports = app => {
  //AUTHENTICATION PROTECTION
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized Request');
    }
  };

  app.post('/api/texttospeech', async (req, res) => {
    try {
      const response = await polly({text: req.body.text});
      res.status(200).send({location: response});
    } catch (error) {
      res.status(400).send(error)
    }
  });

  app.post('/api/courses', isAuthenticated, (req, res) => {
    const { title, owner_id } = req.body;
    insertCourse({ title, owner_id }, (err, course) => {
      if (err) throw err;
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

  app.post('/api/course', isAuthenticated, (req, res) => {
    getCourse(req.body.id, (err, course) => {
      if (err) throw err;
      res.send(course);
    });
  });

};
