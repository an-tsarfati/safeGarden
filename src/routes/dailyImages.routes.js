const express = require('express');
const {
  createBucketController,
  uploadPhotoController,
} = require('../controllers/s3Bucket.controller');
const { upload } = require('../utils/s3Bucket');

const router = express.Router();

router.route('/create-bucket').post(createBucketController);
router.post('/upload', upload.array('photos', 50), uploadPhotoController);

module.exports = router;
