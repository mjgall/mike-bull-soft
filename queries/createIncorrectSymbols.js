const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (challenge_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        const query = `INSERT INTO challenges_symbols_incorrect ( lesson_id, challenge_id) VALUES (${lesson_id}, ${challenge_id});`;

        connection.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            db.getConnection((err, connection) => {
              if (err) {
                reject(err);
              } else {
                connection.query(
                  `SELECT * FROM challenges_symbols_incorrect WHERE id = ${results.insertId};`,
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
      connection.release();
    });
  });
};
