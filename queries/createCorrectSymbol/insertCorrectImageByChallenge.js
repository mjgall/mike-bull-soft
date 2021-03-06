const db = require('../../config/db/mysql').pool;

module.exports = (challenge_id, image_id, lesson_id, symbol_id, index) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO challenges_symbols_correct (challenge_id, image_id, lesson_id, symbol_id) VALUES (${challenge_id}, ${image_id}, ${lesson_id}, ${symbol_id});`;
    // console.log({index, query})
    db.query(query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        const query = `SELECT id, url FROM images WHERE id = ${image_id}`;
        db.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      }
    });
  });
};
