const db = require('../config/db/mysql').pool;

module.exports = async (userId, lessonId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO students_lessons (user_id, lesson_id, create_date, completed, started) VALUES (${userId}, ${lessonId}, UNIX_TIMESTAMP(), 0, 1)`;
    db.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
};
