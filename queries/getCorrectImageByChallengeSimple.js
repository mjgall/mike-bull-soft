const db = require('../config/db/mysql').pool;


//returns the id of the challenge that should be completed
module.exports = (challengeId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT image_id as id FROM challenges_symbols_correct WHERE challenge_id = ${challengeId};`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
};
