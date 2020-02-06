const db = require('../../config/db/mysql').pool;


module.exports = symbol_id => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM images WHERE symbol_id = ${symbol_id} GROUP BY RAND() LIMIT 1;`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};
