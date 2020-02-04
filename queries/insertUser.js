const db = require('../config/db/mysql').pool;
const sqlString = require('sqlstring');
const bcrypt = require('bcryptjs')

module.exports = user => {
  const { service_id, password, first_name, last_name, email, photo_url } = user;

  let query

  if (password) {
    query = `INSERT INTO users (service_id, password, first_name, last_name, email, photo_url, create_date) VALUES (${sqlString.escape(service_id)}, ${sqlString.escape(bcrypt.hashSync(password, 10))}, ${sqlString.escape(first_name)}, ${sqlString.escape(last_name)}, ${sqlString.escape(email)}, ${sqlString.escape(photo_url)}, CURDATE());`;
  } else {
    query = `INSERT INTO users (service_id, password, first_name, last_name, email, photo_url, create_date) VALUES (${sqlString.escape(service_id)}, ${sqlString.escape(password)}, ${sqlString.escape(first_name)}, ${sqlString.escape(last_name)}, ${sqlString.escape(email)}, ${sqlString.escape(photo_url)}, CURDATE());`;
  }

  

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          db.getConnection((err, connection) => {
            connection.query(
              `SELECT * FROM users WHERE id = ${results.insertId}`,
              (err, users, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(users[0]);
              }
            );
          });
          // connection.release();
        }
      });
      connection.release();
    });
  });
};
