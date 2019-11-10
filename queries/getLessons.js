const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (course_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(
        `SELECT * FROM lessons WHERE course_id = ${sqlString.escape(course_id)};`,
        (err, lessons, fields) => {
          if (err) {
            reject(err);
          }
          resolve(lessons);
        }
      );
      connection.release();
    });
  });
};
