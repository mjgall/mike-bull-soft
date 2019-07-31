const db = require('../config/db/mysql').pool;

module.exports = (owner_id, callback) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT courses.id AS course_id, users.id AS user_id, users.google_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses INNER JOIN users ON courses.owner_id=users.google_id WHERE users.google_id='${owner_id}';`,
      (err, courses, fields) => {
        if (err) {
          callback(err, null);
        }
        callback(null, courses);
      }
    );
    connection.release();
  });
};
