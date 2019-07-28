const db = require('../config/db/mysql').pool;

module.exports = (id, callback) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM users WHERE googleId = ${id}`,
      (err, users, fields) => {
        if (err) {
          callback(err, null);
        };
        callback(null, users[0])
      }
    );
    connection.release();
  });
}