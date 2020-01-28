const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (challenge_id, symbol_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        const query = `SELECT * FROM images WHERE symbol_id = ${symbol_id} GROUP BY RAND() LIMIT 1;`;
        connection.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
          } else if (results.length === 0) {
            reject('No images found for that lesson')
          } else {
            db.getConnection((err, connection) => {
              if (err) {
                reject(err);
              } else {
                const query2 = `INSERT INTO challenges_symbols_correct (challenge_id, image_id, lesson_id, symbol_id) VALUES (${challenge_id}, ${results[0].id}, ${lesson_id}, ${symbol_id});`;
                connection.query(query2, (err, results, fields) => {
                  if (err) {
                    reject(err);
                  } else {
                    db.getConnection((err, connection) => {
                      if (err) {
                        reject(err);
                      } else {
                        connection.query(
                          `SELECT images.id, images.url FROM images INNER JOIN challenges_symbols_correct ON images.id = challenges_symbols_correct.image_id WHERE challenges_symbols_correct.id = ${results.insertId}`,
                          (err, results, fields) => {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(results[0]);
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      connection.release();
    });
  });
};
