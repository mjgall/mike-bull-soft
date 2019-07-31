const db = require('../config/db/mysql').pool;

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

module.exports = (course, callback) => {
  const { title, owner_id } = course;
  const query = `INSERT INTO courses (title, owner_id, create_date) VALUES ('${title}', '${owner_id}', NOW());`;

  db.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
    }
    connection.query(query, (err, results, fields) => {
      if (err) {
        callback(err, null);
      } else {
        db.getConnection((err, connection) => {
          connection.query(
            `SELECT courses.id AS course_id, users.id AS user_id, users.google_id, courses.title, users.first_name, users.last_name, courses.create_date FROM courses INNER JOIN users ON courses.owner_id=users.google_id WHERE courses.id='${results.insertId}';`,
            (err, courses, fields) => {
              if (err) {
                callback(err, null);
              }
              callback(null, courses[0]);
            }
          );
        });
        // connection.release();
      }
    });
    connection.release();
  });
};
