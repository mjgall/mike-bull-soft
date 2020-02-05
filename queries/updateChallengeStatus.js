const db = require('../config/db/mysql').pool;

module.exports = (challengeId, newStatus) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE challenges SET status = ${newStatus} WHERE id = ${challengeId};`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
