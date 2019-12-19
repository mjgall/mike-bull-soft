const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');


module.exports = count => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        `SELECT * FROM images GROUP BY RAND() LIMIT ${count};`,
        async (err, symbols, fields) => {
          if (err) {
            reject(err);
          }
          console.log(symbols);
          resolve(symbols);
        }
      );
      connection.release();
    });
  });
};


