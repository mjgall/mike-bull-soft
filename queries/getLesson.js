const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = lessonId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM lessons WHERE id = ${sqlString.escape(lessonId)};`,
      (err, lessons, fields) => {
        if (err) {
          reject(err);
        }
        resolve(lessons[0]);
      }
    );
  });
};
