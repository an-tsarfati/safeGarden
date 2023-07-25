const mongoose = require('mongoose');
const userValidationSchema = require('../validations/user.validation');
const { UserModel } = require('./user.model');

const parentSchema = new mongoose.Schema({
  parentDetails: {
    type: UserModel,
  },
  children: [{ type: mongoose.Schema.ObjectId, ref: 'Child' }],
});
const PaerntModel = mongoose.model('Parent', parentSchema);

module.exports = { PaerntModel, userValidationSchema };
