const db = require('../config/db/mysql').pool;

//SHOULD USE PROMISES AND NOT A CALLBACK

module.exports = lessonId => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM lessons WHERE id=${lessonId};`;
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(query, (err, response, fields) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
      connection.release();
    });
  });
};
