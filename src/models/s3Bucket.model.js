const mongoose = require('mongoose');

const s3BucketSchema = new mongoose.Schema(
  {
    bucketName: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }
);

const S3BucketModel = mongoose.model('s3Bucket', s3BucketSchema);

module.exports = S3BucketModel;
