const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');



module.exports = user_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM users WHERE id=${user_id};`,
      (err, response, fields) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      }
    );
  });
};
