const db = require('../config/db/mysql').pool;

//gets the three incorrect images based on the challenge id, returns an array of image objects in the form of {images.id AS id, images.url as url}
module.exports = challengeId => {
  return new Promise((resolve, reject) => {
    const query = `SELECT images.id AS id, images.url AS url FROM challenges_symbols_incorrect INNER JOIN images ON images.id = challenges_symbols_incorrect.image_id WHERE challenges_symbols_incorrect.challenge_id = ${challengeId};`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
