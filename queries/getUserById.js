const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE id = ${sqlString.escape(id)}`,
      (err, users, fields) => {
        if (err) {
          reject(err);
        }
        resolve(users[0]);
      }
    );
  });
};
