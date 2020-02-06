const db = require('../../config/db/mysql').pool;

// module.exports = (challenge_id, image_id, lesson_id, symbol_id) => {
//   console.log('in insertIntoCorrectTable');
//   return new Promise((resolve, reject) => {
//     db.getConnection((err, connection) => {
//       if (err) {
//         reject(err);
//       } else {
//         const query = `INSERT INTO challenges_symbols_correct (challenge_id, image_id, lesson_id, symbol_id) VALUES (${challenge_id}, ${image_id}, ${lesson_id}, ${symbol_id});`;
//         connection.query(query, (err, result, fields) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result.insertId);
//           }
//         });
//         connection.release();
//       }
//     });
//   });
// };

module.exports = (challenge_id, image_id, lesson_id, symbol_id) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO challenges_symbols_correct (challenge_id, image_id, lesson_id, symbol_id) VALUES (${challenge_id}, ${image_id}, ${lesson_id}, ${symbol_id});`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
};
