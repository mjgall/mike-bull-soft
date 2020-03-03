const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');



module.exports = userId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM logins WHERE user_id = ${userId} AND timestamp = (SELECT MAX(timestamp) FROM logins);`,
      (err, logins, fields) => {
        if (err) {
          reject(err);
        }
        resolve(logins[0]);
      }
    );
  });
};
