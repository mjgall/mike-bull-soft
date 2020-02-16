const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = symbolId => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM symbols WHERE id=${sqlString.escape(symbolId)};`,
      (err, symbols, fields) => {
        if (err) {
          reject(err);
        }
        resolve(symbols[0]);
      }
    );
  });
};
