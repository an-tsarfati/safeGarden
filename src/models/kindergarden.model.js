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
});

const KindergardenModel = mongoose.model('Kindergarden', kindergardenSchema);

module.exports = {
  KindergardenModel,
  kindergardenValidationSchema,
};
