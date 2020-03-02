const mysql = require('mysql');
const keys = require('../keys')

let pool;

//Connect when running on Elastic Beanstalk
if (process.env.ENV === 'production') {
  pool = mysql.createPool({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: 'mikebullsoft',
    connectionLimit: '100',
    multipleStatements: true
  });
} else {
  pool = mysql.createPool({
    host: keys.dbHost,
    user: keys.dbUser,
    password: keys.dbPassword,
    port: keys.dbPort,
    database: keys.dbName,
    connectionLimit: '100',
    multipleStatements: true
  });
}

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) connection.release()
  return
})

pool.on("connection", connection => console.log(`Connection acquired - ${connection.threadId}`))

pool.on("release", connection => console.log(`Connection released -${connection.threadId}`))

exports.pool = pool;


