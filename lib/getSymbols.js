const db = require('../config/db/mysql').pool;

module.exports = (course_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(
        `SELECT * FROM symbols WHERE course_id=${course_id};`,
        (err, courses, fields) => {
          if (err) {
            reject(err);
          }
          resolve(courses);
        }
      );
      connection.release();
    });
  });
};
