require('dotenv').config();

module.exports = {
  jwtPass: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRES_IN,
  cookieExpiration: process.env.JWT_COOKIE_EXPIRES_IN,
};
