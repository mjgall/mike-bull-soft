const db = require('../config/db/mysql').pool;

module.exports = symbolId => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM symbols WHERE id = ${symbolId}; DELETE FROM images WHERE symbol_id = ${symbolId}`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
