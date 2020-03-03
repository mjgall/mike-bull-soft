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
const createChallenges = require('../queries/createChallenges');
const deleteUser = require('../queries/deleteUser');
const getAllLogins = require('../queries/getLoginsByUser');
const sendEmail = require('../services/aws-ses');
const getChallengesByLessonAndUser = require('../queries/getChallengesByLessonAndUser');
const getCorrectImageByChallenge = require('../queries/createCorrectSymbol/getCorrectImageByChallenge');
const getRandomImageInSymbol = require('../queries/createCorrectSymbol/getRandomImageInSymbol');
const insertCorrectImageByChallenge = require('../queries/createCorrectSymbol/insertCorrectImageByChallenge');
const insertIncorrectImagesByChallenge = require('../queries/insertIncorrectImagesByChallenge');
const getIncorrectImagesByChallenge = require('../queries/getIncorrectImagesByChallenge');
const getLastCompletedChallenge = require('../queries/getLastCompletedChallenge');
const getCorrectImageByChallengeSimple = require('../queries/getCorrectImageByChallengeSimple');
const updateChallengeStatus = require('../queries/updateChallengeStatus');
const getStudentLesson = require('../queries/getStudentLesson');
const insertStudentLesson = require('../queries/insertStudentLesson');
const deleteSymbol = require('../queries/deleteSymbol')

const shuffle = function (array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const createChallengesOld = async (lessonId, userId) => {
  const symbols = await getSymbolsByLesson(lessonId);

  const challenges = await Promise.all(
    symbols.map(async (symbol, index) => {
      //first create a challenge row for each symbol, returns that row in the db
      const challengeRow = await createChallenge(userId, lessonId);

      //then create 1 correct symbol object, these are made up of an id and an image url
      // const correctSymbol = await createCorrectSymbol(
      //   challengeRow.id,
      //   symbol.id,
      //   lessonId
      // );

      const randomImageInSymbol = await getRandomImageInSymbol(symbol.id);

      const createdImage = await insertCorrectImageByChallenge(
        challengeRow.id,
        randomImageInSymbol.id,
        lessonId,
        symbol.id
      );

      const correctImage = await getCorrectImageByChallenge(createdImage);

      //only get random images right now, once we have them they should be saved to the incorrect images table to be queried later when the student revisits/reloads a lesson
      const incorrectSymbols = await getRandomImages(3, symbol.id);

      const result = await insertIncorrectImagesByChallenge(
        incorrectSymbols.map(symbol => symbol.id),
        challengeRow.id
      );

      const incorrectImages = await getIncorrectImagesByChallenge(
        challengeRow.id
      );

      //return a completed challenge object which is made up of an challengeId, audioUrl, images: [{imageUrl, id}]
      return {
        id: challengeRow.id,
        audio_url: symbol.audio_url,
        status: challengeRow.status,
        // images: correctSymbol
        images: shuffle([...incorrectImages, correctImage].slice())
      };
    })
  );

  return challenges;
};

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

      if (course && course.user_id === req.body.userId) {
        res.status(200).send({ ...course, exists: true, owner: true });
      } else if (course && course.user_id !== req.body.userId) {
        res.status(200).send({ ...course, exists: true, owner: false });
      } else {
        res.status(200).send({ exists: false, owner: false });
      }
    } catch (error) {
      console.log(error);
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
          await insertImage(imageObject);
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

  app.get('/api/lessons/:lessonId/phases/images', async (req, res) => {
    //fetch a random symbol from lesson
    const symbol = await getRandomSymbolFromLesson(req.params.lessonId);
  });

  app.post('/api/challenges/', async (req, res) => {
    try {
      const response = await createChallenge(
        req.body.lessonId,
        req.body.symbolId,
        req.user.id
      );
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.delete('/api/users/:user_id', async (req, res) => {
    try {
      const response = await deleteUser(req.params.user_id);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/logins/:user_id', async (req, res) => {
    try {
      const response = await getAllLogins(req.params.user_id);
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/email/send', async (req, res) => {
    const { recipientAddress, body, subject } = req.body;
    try {
      const promiseResponse = await sendEmail(recipientAddress, subject, body);
      res.send(promiseResponse);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });

  app.get(
    '/api/users/:userId/lessons/:lessonId/challenges',
    async (req, res) => {
      console.log('we got called');
      try {
        const { userId, lessonId } = req.params;
        // const correctImages = await getChallengesByLessonAndUser(
        //   lessonId,
        //   userId
        // );

        const lesson = await getStudentLesson(lessonId, userId);
        console.log({ lesson });
        if (lesson.exists === false) {
          console.log('creating');
          //we now need to create a challenge for each symbol in the lesson.

          //STEP 1 GET ALL OF THE SYMBOLS IN THE LESSON
          const symbols = await getSymbolsByLesson(lessonId);

          //STEP 2 INSERT A ROW IN challenges FOR EACH SYMBOL, HAVE THE IDS RETURNED

          const challengeIds = await createChallenges(
            symbols,
            userId,
            lessonId
          );

          const challenges = await Promise.all(
            challengeIds.map(async (challengeId, index) => {
              const audio_url = symbols[index].audio_url;

              const incorrectImages = await getRandomImages(
                3,
                symbols[index].id,
                challengeId
              );

              const correctImageId = await getRandomImageInSymbol(
                symbols[index].id
              );

              const correctImage = await insertCorrectImageByChallenge(
                challengeId,
                correctImageId.id,
                lessonId,
                symbols[index].id,
                index
              );

              return {
                id: challengeId,
                audio_url,
                status: 0,
                images: shuffle([...incorrectImages, correctImage].slice())
              };
            })
          );

          await insertStudentLesson(userId, lessonId);

          res.send({ success: true, error: false, challenges });
        } else {
          console.log('only fetching');
          const total = await getChallengesByLessonAndUser(lessonId, userId);
          console.log({ total });
          const challenges = await Promise.all(
            total.challenges.map(async image => {
              const incorrectImages = await getIncorrectImagesByChallenge(
                image.challenge_id
              );
              return {
                id: image.challenge_id,
                audio_url: image.audio_url,
                status: image.status,
                images: shuffle([...incorrectImages, image].slice())
              };
            })
          );
          res.send({ success: true, error: false, challenges });
        }
      } catch (error) {
        console.log(error);
        res.send({ success: false, error });
      }
    }
  );

  app.post('/api/lessons/lastchallenge', async (req, res) => {
    const { userId, lessonId } = req.body;
    try {
      const lastCompletedChallenge = await getLastCompletedChallenge(
        userId,
        lessonId
      );
      res.send({ success: true, error: false, lastCompletedChallenge });
    } catch (error) {
      console.log(error);
      res.send({ success: false, error });
    }
  });

  app.get(
    '/api/challenges/:challengeId/checkanswer/:imageId',
    async (req, res) => {
      const { challengeId, imageId } = req.params;
      try {
        const correctImage = await getCorrectImageByChallengeSimple(
          challengeId
        );

        if (correctImage == imageId) {
          res.send({
            success: true,
            error: false,
            message: 'Correct!',
            correct: true
          });
        } else {
          res.send({
            success: true,
            error: false,
            message: 'Incorrect 🤷‍♂️',
            correct: false
          });
        }
      } catch (error) {
        console.log(error);
        res.send({ success: false, error });
      }
    }
  );

  app.put('/api/challenges', async (req, res) => {
    const { challengeId, newStatus } = req.body;
    try {
      const updatedChallenge = await updateChallengeStatus(
        challengeId,
        newStatus
      );
      res.send({ success: true, error: false, updatedChallenge });
    } catch (error) {
      console.log(error);
      res.send({ success: false, error });
    }
  });

  app.get('/api/lessons/:lessonId/users/:userId', async (req, res) => {
    const { lessonId, userId } = req.params;
    try {
      const student_lesson = await getStudentLesson(lessonId, userId);
      if (student_lesson) {
        res.send({ success: true, error: false, ...student_lesson });
      } else {
        res.send({ success: false, error: false });
      }
    } catch (error) {
      console.log(error);
      res.send({ success: false, error });
      throw new Error(error);
    }
  });

  app.delete('/api/symbols/:symbolId', async (req, res) => {
    const { symbolId } = req.params
    try {
      const response = await deleteSymbol(symbolId)
      res.send({ success: true, error: false })
    } catch (error) {
      console.log(error);
      res.send({ success: false, error });
      throw new Error(error);
    }
  })
};
