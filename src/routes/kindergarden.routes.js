const express = require('express');
const validate = require('../middleware/validateResource');
const kindergardenValidationSchema = require('../validations/kindergarden.validation');
const {
  deleteKindergarden,
  getKindergarden,
  newKindergarden,
  updateKindergarden,
} = require('./../controllers/kindergarden.controller');
const { restrictTo, protect } = require('./../controllers/auth.controller');
const {
  uploadImages,
  resizeImages,
} = require('../middleware/uploadImg.middleware');
const attendance = require('./attendance.routes');

const router = express.Router();

router
  .route('/register')
  .post(validate(kindergardenValidationSchema), newKindergarden);

router
  .route('/:id')
  .get(getKindergarden)
  .patch(updateKindergarden)
  .delete(protect, restrictTo('director'), deleteKindergarden);

router.patch(
  '/uploadImg/:id',
  protect,
  restrictTo('director'),
  uploadImages,
  resizeImages('kindergarden')
);

// Update attendance
router.post('/:kindergardenId/:kidId/attendance', attendance);

// Get all children attendance
router.get('/:kindergardenId/attendance', attendance);

module.exports = router;
