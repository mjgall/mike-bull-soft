const db = require('../config/db/mysql').pool;

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = course_id => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM courses WHERE id=${course_id};`,
        (err, response, fields) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        }
      );
      connection.release();
    });
  });
};