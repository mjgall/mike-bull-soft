const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = lesson => {
  return new Promise((resolve, reject) => {

    const { title, courseId } = lesson;
    const query = `INSERT INTO lessons (course_id, title, create_date) VALUES (${sqlString.escape(
      courseId
    )}, ${sqlString.escape(title)}, UNIX_TIMESTAMP());`;

    console.log(query);
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          db.getConnection((err, connection) => {
            if (err) {
              reject(err);
            }
            connection.query(
              `SELECT * FROM lessons WHERE lessons.id='${results.insertId}';`,
              (err, lessons, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(lessons[0]);
              }
            );
          });
          // connection.release();
        }
      });
      connection.release();
    });
  });
};
