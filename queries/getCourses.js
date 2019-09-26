const db = require('../config/db/mysql').pool;

module.exports = (owner_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(
        `SELECT courses.id AS course_id, users.id AS user_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses INNER JOIN users ON courses.owner_id=users.id WHERE users.id='${owner_id}';`,
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
