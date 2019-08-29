const db = require('../config/db/mysql').pool;

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = course => {
  return new Promise((resolve, reject) => {
    const { title, language, description, difficulty, owner_id } = course;
    const query = `INSERT INTO courses (title, language, description, difficulty, owner_id, create_date) VALUES ('${title}', '${language}', '${description}', '${difficulty}', '${owner_id}', UNIX_TIMESTAMP());`;

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
              `SELECT courses.id AS course_id, users.id AS user_id, users.google_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses INNER JOIN users ON courses.owner_id=users.google_id WHERE courses.id='${
                results.insertId
              }';`,
              (err, courses, fields) => {
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
