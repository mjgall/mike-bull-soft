const insertCourse = require('../queries/insertCourse');
const insertSymbol = require('../queries/insertSymbol');
const getCourses = require('../queries/getCourses');
const getSymbols = require('../queries/getSymbols');
const getSymbol = require('../queries/getSymbol');
const getCourse = require('../queries/getCourse');
const deleteCourse = require('../queries/deleteCourse');
const getAllCourses = require('../queries/getAllCourses');
const updateCourse = require('../queries/updateCourse');
const insertImage = require('../queries/insertImage');
const getImages = require('../queries/getImages');
const polly = require('../services/polly');
const saveToS3 = require('../services/s3');
const getLessons = require('../queries/getLessons');
const getSymbolsByLesson = require('../queries/getSymbolsByLesson');

module.exports = app => {
  //AUTHENTICATION PROTECTION
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized Request');
    }
  };

  const isOwner = (req, res, next) => {
    if (req.user.id === req.body.userId) {
      return next();
    } else {
      res.status(404).send('Unauthorized Request');
    }
  };

  app.post('/api/texttospeech', isAuthenticated, async (req, res) => {
    try {
      const response = await polly({
        text: req.body.text,
        language: req.body.language
      });
      res.status(200).send({ location: response });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //ADD COURSE
  app.post('/api/courses', isAuthenticated, async (req, res) => {
    const { title, language, description, difficulty, owner_id } = req.body;
    try {
      const course = await insertCourse({
        title,
        language,
        description,
        difficulty,
        owner_id
      });
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //GET ALL USER COURSES
  app.get('/api/courses', isAuthenticated, async (req, res) => {
    const owner_id = req.session.passport.user;
    console.log(owner_id);
    try {
      const courses = await getCourses(owner_id);
      res.status(200).send(courses);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //GET COURSE
  app.post('/api/course', isAuthenticated, async (req, res) => {
    try {
      const course = await getCourse(req.body.id);
      console.log(course);
      if (course.user_id === req.body.userId) {
        res.status(200).send({ ...course, owner: true });
      } else {
        res.status(200).send({ ...course, owner: false });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //EDIT COURSE
  app.put('/api/course', isAuthenticated, async (req, res) => {
    const { title, language, description, difficulty, owner_id, id, lessonsOrder } = req.body;
    const course = { title, language, description, difficulty, owner_id, id, lessonsOrder };
    const updatedCourse = await updateCourse(course);
    res.send(updatedCourse);
  });

  //ADD SYMBOL
  app.post('/api/symbols', isAuthenticated, async (req, res) => {
    const { owner_id, course_id, text, language, images } = req.body;
    try {
      const pollyURL = await polly({ text, language });
      const symbol = await insertSymbol({
        owner_id,
        course_id,
        text,
        audio_url: pollyURL
      });
      images.forEach(async imageData => {
        try {
          const location = await saveToS3(imageData);
          const imageObject = {
            url: location,
            user_id: symbol.owner_id,
            symbol_id: symbol.id
          };
          const response = await insertImage(imageObject);
          console.log(response);
        } catch (error) {
          res.status(error);
          console.log(error);
        }
      });
      res.status(200).send(symbol);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

  //GET SYMBOLS
  app.get('/api/symbols/:course', isAuthenticated, async (req, res) => {
    const { course } = req.params;
    try {
      const courses = await getSymbols(course);

      res.status(200).send(courses);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  //GET SYMBOL
  app.get('/api/symbol/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
      const images = await getImages(id);
      const symbol = await getSymbol(id);
      res.status(200).send({ symbol, images });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/api/allcourses', isAuthenticated, async (req, res) => {
    try {
      const courses = await getAllCourses();
      res.status(200).send(courses);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/api/lessons/:course_id', async (req, res) => {
    try {
      const lessons = await getLessons(req.params.course_id);
      res.status(200).send(lessons);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.delete('/api/course/:id', async (req, res) => {
    try {
      const course = await getCourse(req.params.id);
      if (course.user_id === req.user.id) {
        const response = await deleteCourse(req.params.id);
        res.status(200).send({ success: true });
      } else {
        res.status(401).send({ error: 'Not the owner' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/symbolsbylesson/:lessonId', async (req, res) => {
    try {
      const symbols = await getSymbolsByLesson(req.params.lessonId);
      res.status(200).send(symbols);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
