const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');



module.exports = course_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT courses.id AS course_id, users.id AS user_id, courses.title, courses.language, courses.difficulty, courses.description, users.first_name, users.last_name, courses.create_date, courses.lessons_order FROM courses CROSS JOIN users ON courses.owner_id = users.id WHERE courses.id=${sqlString.escape(
        course_id
      )};`,
      (err, courses, fields) => {
        if (err) {
          reject(err);
        }
        resolve(courses[0]);
      }
    );
  });
};
