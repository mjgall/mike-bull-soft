const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');



module.exports = userId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM logins WHERE user_id = ${userId};`,
      (err, logins, fields) => {
        if (err) {
          reject(err);
        }
        resolve(logins);
      }
    );
  });
};
