const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const { accessKeyId, secretAccessKey, region } = require('../../config/aws');

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

async function createS3Bucket(bucketName) {
  try {
    const sanitizedBucketName = bucketName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-');
    console.log('Using region:', region);
    const params = {
      Bucket: sanitizedBucketName,
      CreateBucketConfiguration: {
        LocationConstraint: region,
      },
    };

    await s3.createBucket(params).promise();
    console.log(`Bucket "${sanitizedBucketName}" created successfully.`);
  } catch (err) {
    console.error('Error creating bucket:', err);
    throw new Error('Error creating bucket');
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-bucket-name', // Replace with your bucket name
    acl: 'public-read', // Set the appropriate ACL for your use case
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = { createS3Bucket, upload };
