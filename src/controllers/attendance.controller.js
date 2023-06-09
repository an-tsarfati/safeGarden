const {
  getAllKidsAttendance,
  findAndUpdateAttendance,
} = require('../services/attendance.service');
const catchAsync = require('./../utils/catchAsync');

// Update attendance for a child
const updateAttendance = catchAsync(async (req, res) => {
  const { role, kindergartenId, kidId, timestamp, status } = req.body;

  // Check if the user is a parent
  if (role === 'parent') {
    // Only allow updating 'arrived' status
    if (status !== 'arrived') {
      return res
        .status(403)
        .json({ message: 'Parent can only update arrival status.' });
    }
  }

  // Update the attendance record
  const attendance = await findAndUpdateAttendance(
    { kindergartenId, kidId, timestamp },
    { status },
    { new: true, upsert: true }
  );

  res.status(200).json({ attendance });
});

// Get all children attendance
const getAllAttendance = catchAsync(async (req, res) => {
  const { role, kindergartenId } = req.body;

  // Check if the user is a director or assistant
  if (role !== 'director' && role !== 'assistant') {
    return res
      .status(403)
      .json({ message: 'Only directors and assistants can see attendance.' });
  }

  // Retrieve all attendance records for the kidergarten
  const attendance = await getAllKidsAttendance({ kindergartenId });

  res.status(200).json({ attendance });
});
module.exports = { updateAttendance, getAllAttendance };
