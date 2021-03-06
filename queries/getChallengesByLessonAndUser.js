const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (lessonId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT challenges.id AS challenge_id, challenges.status, images.id AS id, images.url as url, images.symbol_id, symbols.audio_url
        FROM challenges 
        INNER JOIN challenges_symbols_correct 
        ON challenges.id = challenges_symbols_correct.challenge_id
        INNER JOIN images
        ON images.id = challenges_symbols_correct.image_id
        INNER JOIN symbols
        ON symbols.id = challenges_symbols_correct.symbol_id WHERE challenges_symbols_correct.lesson_id = ${sqlString.escape(
          lessonId
        )} AND challenges.user_id = ${userId};`,
      (err, challenges, fields) => {
        if (err) {
          reject(err);
        } else if (challenges.length == 0) {
          resolve({ exist: false });
        } else {
          resolve({ exist: true, challenges });
        }
      }
    );
  });
};
