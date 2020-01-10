const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = userId => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO logins (user_id, timestamp) VALUES (${userId}, UNIX_TIMESTAMP());`;

    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        throw Error(err);
      } else {
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
                  `SELECT * FROM logins WHERE id = ${results.insertId}`,
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
