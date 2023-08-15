const mongoose = require('mongoose');
const childValidationSchema = require('../validations/child.validation');

const childSchema = new mongoose.Schema(
  {
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
    attended: { type: mongoose.Schema.ObjectId, ref: 'Attendance' },
    parent: { type: mongoose.Schema.ObjectId, ref: 'User' },
    kindergarten: { type: mongoose.Schema.ObjectId, ref: 'Kindergarden' },
  },
  {
    timestamps: true,
  }
);

childSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'parent kindergarten',
    options: { _recursed: true },
    select:
      '-__v -passwordChangedAt -children -kindergarden -password -createdAt -updatedAt -director',
  });
  next();
});

childSchema.post('find', async function (docs) {
  for (const doc of docs) {
    if (doc.isPublic) {
      await doc.populate('attended');
    }
  }
});

const ChildModel = mongoose.model('Child', childSchema);

module.exports = { ChildModel, childValidationSchema };
