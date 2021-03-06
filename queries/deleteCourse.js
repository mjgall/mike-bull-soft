const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = course_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM courses WHERE id=${sqlString.escape(course_id)};`,
      (err, response, fields) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      }
    );
  });
};