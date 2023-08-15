const AWS = require('aws-sdk');
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

module.exports = { createS3Bucket };
