const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (userId, token, expiry) => {
  console.log(token);
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO resets (user_id, token, expiry) VALUES (${sqlString.escape(
      userId
    )}, ${sqlString.escape(token)}, ${sqlString.escape(expiry)});`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        throw Error(err);
      } else {
        db.query(
          `SELECT * FROM resets WHERE id = ${results.insertId}`,
          (err, results, fields) => {
            if (err) {
              reject(err);
              throw Error(err);
            } else {
              resolve(results[0]);
            }
          }
        );
      }
    });
  });
};
