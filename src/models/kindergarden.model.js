const mongoose = require('mongoose');
const kindergardenValidationSchema = require('../validations/kindergarden.validation');
const UserModel = require('../models/user.model');

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
  // staff: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  children: [{ type: mongoose.Schema.ObjectId, ref: 'Child' }],
});

kindergardenSchema.pre(/^find/, function (next) {
  this.populate({ path: 'director', model: UserModel }); // Use UserModel as the reference

  next();
});

kindergardenSchema.pre(/^find/, function (next) {
  this.populate({ path: 'director', select: '-__v -passwordChangedAt' });

  next();
});

const KindergardenModel = mongoose.model('Kindergarden', kindergardenSchema);

module.exports = {
  KindergardenModel,
  kindergardenValidationSchema,
};
