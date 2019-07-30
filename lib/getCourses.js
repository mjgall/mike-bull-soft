const db = require('../config/db/mysql').pool;

module.exports = (owner_id, callback) => {
  db.getConnection((err, connection) => {
    console.log(owner_id)
    if (err) throw err;
    connection.query(
      `SELECT * FROM courses WHERE owner_id='${owner_id}'`,
      (err, courses, fields) => {
        if (err) {
          callback(err, null);
        }
        callback(null, courses);
      }
    );
    connection.release();
  });
};
