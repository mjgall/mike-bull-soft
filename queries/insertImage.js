const db = require('../config/db/mysql').pool;

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = image => {
  return new Promise((resolve, reject) => {
    const { user_id, symbol_id, url } = image;
    const query = `INSERT INTO images ( create_date, url, user_id, symbol_id ) VALUES (UNIX_TIMESTAMP(), '${url}', '${user_id}', '${symbol_id}');`;

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