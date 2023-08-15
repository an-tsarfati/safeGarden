const express = require('express');
const {
  createBucketController,
} = require('../controllers/s3Bucket.controller');
const router = express.Router();

router.route('/create-bucket').post(createBucketController);

module.exports = router;
