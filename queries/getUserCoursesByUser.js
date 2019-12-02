const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');


module.exports = user_id => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        `SELECT * 
         FROM courses
         INNER JOIN users_courses ON courses.id = users_courses.course_id
         WHERE users_courses.user_id=${sqlString.escape(user_id)};`,
        async (err, symbols, fields) => {
          if (err) {
            reject(err);
          }
          console.log(symbols);
          resolve(symbols);
        }
      );
      connection.release();
    });
  });
};
