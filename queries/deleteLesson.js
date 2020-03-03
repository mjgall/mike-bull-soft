const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');



module.exports = lessonId => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM lessons WHERE id=${sqlString.escape(lessonId)};`;

    db.query(query, (err, response, fields) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
};
