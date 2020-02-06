const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (user_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        const query = `INSERT INTO challenges (user_id, status, lesson_id, create_date) VALUES (${user_id}, 0, ${lesson_id}, UNIX_TIMESTAMP());`;
    
        connection.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            db.getConnection((err, connection) => {
              if (err) {
                reject(err);
              } else {
                connection.query(
                  `SELECT * FROM challenges WHERE id = ${results.insertId};`,
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
