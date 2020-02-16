const db = require('../config/db/mysql').pool;

module.exports = (lessonId, userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM students_lessons WHERE lesson_id = ${lessonId} AND user_id = ${userId}`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        resolve({ exists: false });
      } else {
        resolve({ exists: true, lesson: results[0] });
      }
    });
  });
};
