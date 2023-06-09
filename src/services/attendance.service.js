const { filter } = require('compression');
const AttendanceModel = require('../models/attendance.model');

async function findAndUpdateAttendance(query, update, options) {
  return AttendanceModel.findOneAndUpdate(query, update, options);
}

async function getAllKidsAttendance() {
  return AttendanceModel.find(filter);
}

module.exports = {
  getAllKidsAttendance,
  findAndUpdateAttendance,
};
