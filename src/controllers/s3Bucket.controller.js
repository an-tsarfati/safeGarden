const { createBucket } = require('../services/s3Bucket.service');
const catchAsync = require('../utils/catchAsync');

const createBucketController = catchAsync(async (req, res) => {
  const bucketName = req.body.bucketName;
  const bucketRecord = await createBucket(bucketName);
  res
    .status(200)
    .json({ message: `Bucket "${bucketName}" created successfully.` });
});

module.exports = { createBucketController };
