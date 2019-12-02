const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = (userId, courseId) => {
  return new Promise((resolve, reject) => {

    const query = `INSERT INTO users_courses (user_id, course_id) VALUES (${sqlString.escape(userId)}, ${sqlString.escape(courseId)});`;

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
              `SELECT * FROM users_courses WHERE id='${
                results.insertId
              }';`,
              (err, courses, fields) => {
                console.log(courses)
                if (err) {
                  reject(err);
                }
                resolve(courses[0]);
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
