const express = require('express');
const userValidationSchema = require('../validations/user.validation');
const validate = require('../middleware/validateResource');

const {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateUser,
} = require('./../controllers/user.controller');
const {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} = require('./../controllers/auth.controller');
const {
  uploadImages,
  resizeImages,
} = require('../middleware/uploadImg.middleware');

const router = express.Router();

router.post('/signup', validate(userValidationSchema), signup);

router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', uploadImages, resizeImages('user'), updateUser);

router.delete('/deleteMe', deleteMe);

// router.use(restrictTo('admin'));
console.log(getAllUsers);
router.route('/').get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
