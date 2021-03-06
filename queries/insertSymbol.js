const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

//CREATES A USER WITH A CALLBACK WITH TWO ARGS, ERROR THEN THE JUST CREATED USER -- TWO CONNECTIONS HAPPEN, SEEMS WEIRD BUT WORKS



module.exports = symbol => {
  return new Promise((resolve, reject) => {
    const { owner_id, course_id, text, audio_url } = symbol;
    const query = `INSERT INTO symbols ( owner_id, course_id, create_date, text, audio_url ) VALUES (${sqlString.escape(
      owner_id
    )}, ${sqlString.escape(course_id)}, UNIX_TIMESTAMP(), ${sqlString.escape(
      text
    )}, ${sqlString.escape(audio_url)});`;

    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        db.query(
          `SELECT * FROM symbols WHERE id=${results.insertId};`,
          (err, symbols, fields) => {
            if (err) {
              reject(err);
            }
            resolve(symbols[0]);
          }
        );
      }
    });
  });
};
