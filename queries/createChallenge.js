const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (lessonId, symbolId, user_id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query()
      }
      connection.release();
    });
  });
};

