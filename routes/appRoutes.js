const insertCourse = require('../queries/insertCourse');
const insertSymbol = require('../queries/insertSymbol');
const getCourses = require('../queries/getCourses');
const getSymbols = require('../queries/getSymbols');
const getSymbol = require('../queries/getSymbol');
const getCourse = require('../queries/getCourse');
const deleteCourse = require('../queries/deleteCourse');
const deleteLesson = require('../queries/deleteLesson');
const getAllCourses = require('../queries/getAllCourses');
const updateCourse = require('../queries/updateCourse');
const insertImage = require('../queries/insertImage');
const getImages = require('../queries/getImages');
const polly = require('../services/polly');
const saveToS3 = require('../services/s3');
const getLessons = require('../queries/getLessons');
const getSymbolsByLesson = require('../queries/getSymbolsByLesson');
const insertLesson = require('../queries/insertLesson.js');
const getLesson = require('../queries/getLesson');
const createUserCourse = require('../queries/createUserCourse');
const getUserCoursesByUser = require('../queries/getUserCoursesByUser');
const getRandomImages = require('../queries/getRandomImages');
const createChallenge = require('../queries/createChallenge');
const deleteUser = require('../queries/deleteUser');
const getAllLogins = require('../queries/getLoginsByUser');

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
    const {
      title,
      language,
      description,
      difficulty,
      owner_id,
      id,
      lessonsOrder
    } = req.body;
    const course = {
      title,
      language,
      description,
      difficulty,
      owner_id,
      id,
      lessonsOrder
    };
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

  app.post('/api/lessons', async (req, res) => {
    try {
      const response = await insertLesson(req.body.lesson);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.delete('/api/lessons/:id', async (req, res) => {
    try {
      // const lesson = await getCourse(req.params.id);
      const response = await deleteLesson(req.params.id);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/lesson/:id', async (req, res) => {
    try {
      const response = await getLesson(req.params.id);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post(`/api/users_courses`, async (req, res) => {
    console.log(req.body);
    try {
      const response = await createUserCourse(
        req.body.userId,
        req.body.courseId
      );
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get(`/api/users_courses/:userId`, async (req, res) => {
    console.log(req.params);
    try {
      const response = await getUserCoursesByUser(req.params.userId);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/randomImages/:count', async (req, res) => {
    try {
      const response = await getRandomImages(req.params.count);
      // const response = await createChallenge(req.body.lessonId)
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/challenges/', async (req, res) => {
    try {
      const response = await createChallenge(req.body.lessonId, req.body.symbolId, req.user.id);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.delete('/api/users/:user_id', async (req, res) => {
    try {
      const response = await deleteUser(req.params.user_id);
      res.status(200).send({success: true, response})
    } catch (error) {
      res.status(500).send(error);
    }
  })

  app.get('/api/logins/:user_id', async (req, res) => {
    try {
      const response = await getAllLogins(req.params.user_id);
      res.status(200).send({success: true, response})
    } catch (error) {
      res.status(500).send(error);
    }
  })
};
