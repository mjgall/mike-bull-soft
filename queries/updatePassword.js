const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');
const bcrypt = require('bcryptjs');

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = (userId, password) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE users SET password = ${sqlString.escape(
          bcrypt.hashSync(password, 10)
        )} WHERE id = ${sqlString.escape(userId)} ;`,
        (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            connection.query(
              `SELECT * FROM users WHERE id = ${userId}`,
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
