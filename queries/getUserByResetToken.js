const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = token => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT resets.expiry, users.* FROM resets INNER JOIN users ON resets.user_id = users.id AND resets.token = "${token}"`,
      (err, results, fields) => {
        if (err) {
          reject(err);
        } else console.log(results);
        resolve(results[0]);
      }
    );
  });
};
