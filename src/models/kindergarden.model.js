const mongoose = require('mongoose');
const kindergardenValidationSchema = require('../validations/kindergarden.validation');

const kindergardenSchema = new mongoose.Schema({
  kindergardenName: {
    type: String,
    required: true,
  },
  kindergardenAddress: {
    type: String,
    required: true,
  },
  kindergardenAuthority: {
    type: String,
    required: true,
  },
  kindergardenWorkHours: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  children: [{ type: mongoose.Schema.ObjectId, ref: 'Child' }],
  director: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

kindergardenSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'director children',
    options: { _recursed: true },
    select: '-__v -passwordChangedAt',
  });
  next();
});

KindergardenModel = mongoose.model('Kindergarden', kindergardenSchema);


module.exports = {
  KindergardenModel,
  kindergardenValidationSchema,
};
