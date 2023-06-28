const express = require('express');
const userValidationSchema = require('../validations/user.validation');
const validate = require('../middleware/validateResource');

const {
  deleteChild,
  getAllchildren,
  getChild,
  newChild,
  updateChild,
} = require('./../controllers/child.controller');
const { protect, restrictTo } = require('./../controllers/auth.controller');
const {
  uploadImages,
  resizeImages,
} = require('../middleware/uploadImg.middleware');

const router = express.Router();

router.post('/addChild', validate(userValidationSchema), newChild);

// Protect all routes after this middleware
// router.use(protect);
router.patch('/updateChildImg', uploadImages, resizeImages('child'));

// router.use(restrictTo('admin'));

router.route('/').get(getAllchildren);

router.route('/:id').get(getChild).patch(updateChild).delete(deleteChild);

module.exports = router;
