const mongoose = require('mongoose');
const attandenceValidationSchema = require('../validations/attendance.validation');

const attandenceSchema = new mongoose.Schema(
  {
    role: {
      //only for parents
      type: String,
      required: true,
    },
    kindergartenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'kindergarden',
      required: true,
    },
    kidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['arrived', 'sick', 'vacation'],
      required: true,
    },
  },
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }
);

const attandenceModel = mongoose.model('attandence', attandenceSchema);

module.exports = {
  attandenceModel,
  attandenceValidationSchema,
};
