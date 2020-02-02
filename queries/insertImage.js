const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = image => {
  return new Promise((resolve, reject) => {
    const { user_id, symbol_id, url } = image;
    const query = `INSERT INTO images ( create_date, url, user_id, symbol_id ) VALUES (UNIX_TIMESTAMP(), ${sqlString.escape(url)}, ${sqlString.escape(user_id)}, ${sqlString.escape(symbol_id)});`;

    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          db.getConnection((err, connection) => {
            if (err) {
              reject(err);
            }
            connection.query(
              `SELECT * FROM images WHERE id=${results.insertId};`,
              (err, images, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(images[0]);
              }
            );
          });
          // connection.release();
        }
      });
      connection.release();
    });
  });
};