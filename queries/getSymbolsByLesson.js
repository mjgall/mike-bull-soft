const db = require('../config/db/mysql').pool;


module.exports = lesson_id => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(
        `SELECT * 
         FROM symbols
         INNER JOIN lessons_symbols ON symbols.id = lessons_symbols.symbol_id
         WHERE lessons_symbols.lesson_id=${lesson_id};`,
        async (err, symbols, fields) => {
          if (err) {
            reject(err);
          }
          console.log(symbols);
          resolve(symbols);
        }
      );
      connection.release();
    });
  });
};
