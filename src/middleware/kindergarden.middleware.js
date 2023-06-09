const mongoose = require('mongoose');
const kindergardenValidation = require('../validations/kindergarden.validation');

const kindergardenSchema = new mongoose.Schema({
  kindergardenAddress: {
    type: String,
    required: true,
  },
  kindergardenClasses: {
    type: String,
  },
});

kindergardenSchema.pre('save', async function (next) {
  try {
    await kindergardenValidation.validateAsync(this);
    next();
  } catch (err) {
    next(err);
  }
});

const KidergardenModel = mongoose.model('Kidergarden', kindergardenSchema);

module.exports = {
  KidergardenModel,
  kindergardenValidationSchema,
};
