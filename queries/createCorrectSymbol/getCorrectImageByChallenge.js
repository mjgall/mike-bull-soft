const db = require('../../config/db/mysql').pool;

// module.exports = challenge_id => {
//   return new Promise((resolve, reject) => {
//     db.getConnection((err, connection) => {
//       if (err) {
//         reject(err);
//       } else {
//         const query = `SELECT images.id, images.url FROM images INNER JOIN challenges_symbols_correct ON images.id = challenges_symbols_correct.image_id WHERE challenges_symbols_correct.id = ${challenge_id};`;
//         connection.query(query, (err, results, fields) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(results[0]);
//           }
//         });
//         connection.release();
//       }
//     });
//   });
// };

module.exports = challenge_id => {
  return new Promise((resolve, reject) => {
    const query = `SELECT images.id, images.url FROM images INNER JOIN challenges_symbols_correct ON images.id = challenges_symbols_correct.image_id WHERE challenges_symbols_correct.id = ${challenge_id};`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};
