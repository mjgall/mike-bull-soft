const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = symbolId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM images WHERE symbol_id=${sqlString.escape(symbolId)};`,
      (err, images, fields) => {
        if (err) {
          reject(err);
        }
        resolve(images);
      }
    );
  });
};
