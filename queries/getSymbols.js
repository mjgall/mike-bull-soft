const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = course_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM symbols WHERE course_id=${sqlString.escape(course_id)};`,
      (err, courses, fields) => {
        if (err) {
          reject(err);
        }
        resolve(courses);
      }
    );
  });
};
