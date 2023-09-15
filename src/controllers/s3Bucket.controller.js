const { createBucket } = require('../services/s3Bucket.service');
const { upload } = require('../utils/s3Bucket');
const catchAsync = require('../utils/catchAsync');

const createBucketController = catchAsync(async (req, res) => {
  const bucketName = req.body.bucketName;
  const bucketRecord = await createBucket(bucketName);
  res
    .status(200)
    .json({ message: `Bucket "${bucketName}" created successfully.` });
});

const uploadPhotoController = catchAsync(async (req, res) => {
  const bucketName = req.body.bucketName; // Bucket name from the request
  const photos = req.files; // Uploaded photos from the request

  const uploadedPhotoUrls = [];
  for (const photo of photos) {
    const uploadedUrl = await upload(bucketName, photo);
    uploadedPhotoUrls.push(uploadedUrl);
  }

  res.status(200).json({
    message: 'Photos uploaded successfully.',
    urls: uploadedPhotoUrls,
  });
});

module.exports = { createBucketController, uploadPhotoController };
