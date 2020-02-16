const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (symbols, user_id, lesson_id) => {
  return new Promise((resolve, reject) => {

    const query = `INSERT INTO challenges (user_id, status, lesson_id, create_date) VALUES ?;`;
    
    const values = symbols.map(symbol => {
      return [user_id, '0', lesson_id, 'UNIX_TIMESTAMP()'];
    });

    db.query(query, [values], (err, results, fields) => {
      const rows = [];
      for (
        let index = results.insertId;
        index < results.insertId + results.affectedRows;
        index++
      ) {
        // console.log(index)
        rows.push(index);
      }
      resolve(rows);
    });
  });
};
