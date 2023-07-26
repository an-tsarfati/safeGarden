const express = require('express');
const {
  updateAttendance,
  getAllAttendance,
} = require('../controllers/attendance.controller');
const {
  attendanceValidationSchema,
} = require('../validations/attendance.validation');
const validate = require('../middleware/validateResource');
// const { protect, restrictTo } = require('../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

// router.use(protect);

// Update attendance
router.post(
  '/api/:kindergarden/:kidId/attendance',
  validate(attendanceValidationSchema),
  // restrictTo('parent'),
  updateAttendance
);

// Get all children attendance
router.get(
  '/api/:kindergarden/attendance',
  validate(attendanceValidationSchema),
  // restrictTo('director', 'assistant'),
  getAllAttendance
);

module.exports = router;
