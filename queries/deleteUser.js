const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//SHOULD USE PROMISES AND NOT A CALLBACK

export default user_id => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `DELETE FROM users WHERE id=${user_id};`,
        (err, response, fields) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        }
      );
      connection.release();
    });
  });
};
