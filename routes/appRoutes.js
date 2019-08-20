const insertCourse = require('../queries/insertCourse');
const insertSymbol = require('../queries/insertSymbol');
const getCourses = require('../queries/getCourses');
const getSymbols = require('../queries/getSymbols');
const getCourse = require('../queries/getCourse');
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

  app.post('/api/texttospeech', isAuthenticated, async (req, res) => {
    try {
      const response = await polly({ text: req.body.text });
      res.status(200).send({ location: response });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //ADD COURSE
  app.post('/api/courses', isAuthenticated, async (req, res) => {
    const { title, owner_id } = req.body;
    try {
      const course = await insertCourse({ title, owner_id });
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //GET ALL USER COURSES
  app.get('/api/courses', isAuthenticated, async (req, res) => {
    const owner_id = req.session.passport.user;
    try {
      const courses = await getCourses(owner_id);
      res.status(200).send(courses);
    } catch {
      res.status(400).send(error);
    }
  });

  //GET COURSE
  app.post('/api/course', isAuthenticated, async (req, res) => {
    try {
      const course = await getCourse(req.body.id);
      res.status(200).send(course);
    } catch {
      res.status(400).send(error);
    }
  });

  //ADD SYMBOL
  app.post('/api/symbols', isAuthenticated, async (req, res) => {
    const { owner_id, course_id, text } = req.body;

    try {
      const pollyURL = await polly({ text });
      const course = await insertSymbol({
        owner_id,
        course_id,
        text,
        audio_url: pollyURL
      });
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //GET SYMBOLS
  app.get('/api/symbols/:course', isAuthenticated, async (req, res) => {
    const { course } = req.params;
    try {
      const courses = await getSymbols(course);
      res.status(200).send(courses);
    } catch {
      res.status(400).send(error);
    }
  });
};
