const mongoose = require('mongoose');
const childValidationSchema = require('../validations/child.validation');

const childSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    kidId: {
      type: Number,
      required: function () {
        return this.role === 'parent';
      },
      unique: true,
    },
    HMO: {
      type: String,
      required: function () {
        return this.role === 'parent';
      },
      enum: ['Clalit', 'Maccabi', 'Meuhedet', 'Leumit'],
    },
    alergies: {
      type: String,
    },
    // attended: [{ type: mongoose.Schema.ObjectId, ref: 'Attendance' }],
    // parent: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // kindergarten: [{ type: mongoose.Schema.ObjectId, ref: 'Kindergarden' }],
  },
  {
    timestamps: true,
  }
);

const ChildModel = mongoose.model('Child', childSchema);

module.exports = { ChildModel, childValidationSchema };
