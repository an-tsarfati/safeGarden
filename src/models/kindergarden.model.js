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
  kindergardenClasses: {
    type: String,
  },
  kindergardenWorkHours: {
    type: String,
    required: true,
  },
  director: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

kindergardenSchema.pre('save', async function (next) {
  try {
    await kindergardenValidation.validateAsync(this);
    next();
  } catch (err) {
    next(err);
  }
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
