const mongoose = require('mongoose');
const kindergardenValidation = require('../validations/kindergarden.validation');

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

const KidergardenModel = mongoose.model('Kidergarden', kindergardenSchema);

module.exports = {
  KidergardenModel,
  kindergardenValidationSchema,
};
