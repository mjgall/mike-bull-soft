const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT courses.id AS id, users.id AS user_id, users.first_name, users.last_name, courses.title, courses.create_date, courses.language FROM courses JOIN users ON courses.owner_id WHERE courses.owner_id = users.id;`,
      (err, courses, fields) => {
        if (err) {
          reject(err);
        }
        resolve(courses);
      }
    );
  });
};
