const express = require('express');
const validate = require('../middleware/validateResource');
const {
  deleteKindergarden,
  getKindergarden,
  newKindergarden,
  updateKindergarden,
} = require('./../controllers/kindergarden.controller');
const { restrictTo, protect } = require('./../controllers/auth.controller');
const kindergardenValidationSchema = require('../validations/kindergarden.validation');
const {
  uploadImages,
  resizeImages,
} = require('../middleware/uploadImg.middleware');
const attendance = require('./attendance.routes');

const router = express.Router();

// Update attendance
router.post('/api/:kindergarden/:kidId/attendance', attendance);

// Get all children attendance
router.get('/api/:kindergarden/attendance', attendance);

router
  .route('/api/kindergarden/')
  .post(
    [validate(kindergardenValidationSchema), protect, restrictTo('director')],
    newKindergarden
  );

router
  .route('/api/kindergarden/:id')
  .get(getKindergarden)
  .patch(
    protect,
    restrictTo('director'),
    uploadKindergardenClassImages,
    uploadImages,
    resizeImages('kindergarden'),
    updateKindergarden
  )
  .delete(protect, restrictTo('director'), deleteKindergarden);

module.exports = router;
