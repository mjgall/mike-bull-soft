const db = require('../config/db/mysql').pool;

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = symbol => {
  return new Promise((resolve, reject) => {
    const { owner_id, course_id, text, audio_url } = symbol;
    const query = `INSERT INTO symbols ( owner_id, course_id, create_date, text, audio_url ) VALUES ('${owner_id}', ${course_id}, UNIX_TIMESTAMP(), '${text}', '${audio_url}');`;

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
              `SELECT * FROM symbols WHERE id=${results.insertId};`,
              (err, symbols, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(symbols[0]);
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
