const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = course => {
  const { description, difficulty, language, title, id, lessonsOrder } = course;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE courses SET description = ${sqlString.escape(
          description
        )}, difficulty = ${sqlString.escape(
          difficulty
        )}, language = ${sqlString.escape(
          language
        )}, title = ${sqlString.escape(
          title
        )}, lessons_order = ${sqlString.escape(
          lessonsOrder
        )} WHERE id = ${sqlString.escape(id)} ;`,
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            connection.query(
              `SELECT * FROM courses WHERE id = ${id}`,
              (err, results, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results[0]);
                }
              }
            );
          }
        }
      );
      connection.release();
    });
  });
};
