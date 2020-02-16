const db = require('../config/db/mysql').pool;

//returns the id of the challenge that should be completed
module.exports = (userId, lessonId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM challenges WHERE user_id = ${userId} AND lesson_id = ${lessonId} AND status = 0 ORDER BY id LIMIT 0, 1;`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else if (!results[0]) {
        resolve({ lessonCompleted: true });
      } else {
        resolve(results[0].id);
      }
    });
  });
};
