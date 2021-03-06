const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = owner_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT courses.id AS course_id, users.id AS user_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses INNER JOIN users ON courses.owner_id=users.id WHERE users.id=${sqlString.escape(
        owner_id
      )};`,
      (err, courses, fields) => {
        if (err) {
          reject(err);
        }
        resolve(courses);
      }
    );
  });
};
