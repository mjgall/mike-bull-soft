const db = require('../config/db/mysql').pool;

module.exports = (symbolId) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }

      connection.query(
        `SELECT * FROM images WHERE symbol_id=${symbolId};`,
        (err, images, fields) => {
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
