module.exports = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
  dbHost: process.env.RDS_HOSTNAME,
  dbUser: process.env.RDS_USERNAME,
  dbPassword: process.env.RDS_PASSWORD,
  dbPort: process.env.RDS_PORT,
  dbName: 'mikebullsoft',
};