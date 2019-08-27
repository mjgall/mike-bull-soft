const db = require('../config/db/mysql').pool;

module.exports = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        `SELECT courses.id AS id, users.id AS user_id, users.google_id, users.first_name, users.last_name, courses.title, courses.create_date FROM courses JOIN users ON courses.owner_id WHERE courses.owner_id = users.google_id;`,
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
