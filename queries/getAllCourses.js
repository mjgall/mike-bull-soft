const db = require('../config/db/mysql').pool;

module.exports = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(
        `SELECT * FROM courses;`,
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
