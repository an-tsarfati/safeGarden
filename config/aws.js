// aws-config.js
const AWS = require('aws-sdk');

module.exports = {
  accessKeyId: process.env.ACCESS_KEY_IAM,
  secretAccessKey: process.env.SECRET_KEY_IAM,
  region: process.env.REGION,
};

const s3 = new AWS.S3();
