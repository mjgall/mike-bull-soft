const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');


module.exports = (count, symbolIdToExclude) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        `SELECT id, url, symbol_id FROM images WHERE symbol_id != ${symbolIdToExclude} GROUP BY RAND() LIMIT ${count};`,
        async (err, images, fields) => {
          if (err) {
            reject(err);
          }
          resolve(images);
        }
      );
      connection.release();
    });
  });
};


