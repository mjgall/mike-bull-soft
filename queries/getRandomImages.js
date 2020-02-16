const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (count, symbolIdToExclude, challengeId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, url, symbol_id FROM images WHERE symbol_id != ${symbolIdToExclude} GROUP BY RAND() LIMIT ${count};`,
      async (err, randomImages, fields) => {
        if (err) {
          reject(err);
        }
        const query = `INSERT INTO challenges_symbols_incorrect (image_id, challenge_id) VALUES ?;`;
        const values = randomImages.map(image => {
          return [image.id, challengeId];
        });
        db.query(query, [values], (err, savedRandomImages, fields) => {
          resolve(randomImages);
        });
      }
    );
  });
};
