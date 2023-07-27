const mongoose = require('mongoose');
const { userSchema } = require('./user.model');
const extendSchema = require('mongoose-extend-schema');

const parentSchema = extendSchema(userSchema, {
  myKids: [{ type: mongoose.Schema.ObjectId, ref: 'Child' }],
});

const ParentModel = mongoose.model('Parent', parentSchema);

module.exports = { ParentModel };
