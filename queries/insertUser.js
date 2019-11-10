const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = user => {
  const { google_id, first_name, last_name, email, photo_url } = user;
  const query = `INSERT INTO users (google_id, first_name, last_name, email, photo_url, create_date) VALUES ('${sqlString.escape(google_id)}', '${sqlString.escape(first_name)}', '${sqlString.escape(last_name)}', '${sqlString.escape(email)}', '${sqlString.escape(photo_url)}', NOW());`;

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          db.getConnection((err, connection) => {
            connection.query(
              `SELECT * FROM users WHERE id = ${results.insertId}`,
              (err, users, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(users[0]);
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
