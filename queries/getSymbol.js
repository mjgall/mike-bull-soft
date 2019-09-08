const db = require('../config/db/mysql').pool;

module.exports = (symbolId) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(
        `SELECT * FROM symbols WHERE id=${symbolId};`,
        (err, symbols, fields) => {
          if (err) {
            reject(err);
          }
          resolve(symbols[0]);
        }
      );
      connection.release();
    });
  });
};
