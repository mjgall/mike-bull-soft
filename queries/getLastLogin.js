const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = userId => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM logins WHERE user_id = ${userId} AND timestamp = (SELECT MAX(timestamp) FROM logins);`,
        (err, logins, fields) => {
          if (err) {
            reject(err);
          }
          resolve(logins[0]);
        }
      );
      connection.release();
    });
  });
};
