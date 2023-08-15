const S3BucketModel = require('../models/s3Bucket.model');
const { createS3Bucket } = require('../utils/s3Bucket');

async function createBucket(bucketName) {
  try {
    const sanitizedBucketName = bucketName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-');
    // Create a new record in the database with the sanitized bucketName
    const bucketRecord = await S3BucketModel.create({
      bucketName: sanitizedBucketName,
    });

    // Call utility function to create the S3 bucket
    await createS3Bucket(sanitizedBucketName);

    return bucketRecord;
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw new Error('Error creating bucket');
  }
}

module.exports = { createBucket };
