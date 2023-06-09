require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  dbUri: process.env.DATABASE,
  dbPassword: process.env.DATABASE_PASSWORD,
};
