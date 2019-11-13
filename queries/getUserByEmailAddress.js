const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        `SELECT * FROM users WHERE email = ${sqlString.escape(email)}`,
        (err, users, fields) => {
          if (err) {
            reject(err);
          };
          resolve(users[0])
        }
      );
      connection.release();
    });
  }) 
  
}