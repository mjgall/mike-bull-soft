const db = require('../config/db/mysql').pool;

module.exports = (course_id, callback) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT courses.id AS course_id, users.id AS user_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses CROSS JOIN users ON courses.owner_id = users.google_id WHERE courses.id=${course_id};`,
      (err, courses, fields) => {
        if (err) {
          callback(err, null);
        }
        callback(null, courses[0]);
      }
    );
    connection.release();
  });
};
