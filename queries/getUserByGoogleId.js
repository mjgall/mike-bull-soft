const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');

module.exports = (id) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        // `SELECT * FROM users WHERE service_id = ${sqlString.escape(id)}`,
        `SELECT users.*, MAX(logins.timestamp) AS last_login FROM users INNER JOIN logins ON users.id = logins.user_id WHERE users.service_id = ${sqlString.escape(id)}`,
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