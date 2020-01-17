const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (userId, token, expiry) => { 
  console.log(token)
  return new Promise((resolve, reject) => {
    console.log(typeof sqlString.escape(token))
    console.log(typeof token)
    const query = `INSERT INTO resets (user_id, token, expiry) VALUES (${sqlString.escape(userId)}, ${sqlString.escape(token)}, ${sqlString.escape(expiry)});`;

    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        throw Error(err);
      } else {
        console.log(query)
        connection.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
            throw Error(err);
          } else {
            db.getConnection((err, connection) => {
              if (err) {
                reject(err);
                throw Error(err);
              } else {
                connection.query(
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
          }
          connection.release();
        });
      }
    });
  });
};
