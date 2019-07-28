const db = require('../config/db/mysql').pool;

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

module.exports = (user, callback) => {
  const { googleId, first_name, last_name, email, photo_url } = user;
  const query = `INSERT INTO users (googleId, first_name, last_name, email, photo_url, create_date) VALUES ('${googleId}', '${first_name}', '${last_name}', '${email}', '${photo_url}', NOW());`;

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
            `SELECT * FROM users WHERE id = ${results.insertId}`,
            (err, users, fields) => {
              if (err) {
                callback(err, null);
              };
              callback(null, users[0])
            }
          );
        });
        connection.release();
      }
    });
    connection.release();
  });
}