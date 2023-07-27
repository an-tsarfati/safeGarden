const mongoose = require('mongoose');
const { userSchema } = require('./user.model');
const extendSchema = require('mongoose-extend-schema');

const directorSchema = extendSchema(userSchema, {
  kindergarden: [{ type: mongoose.Schema.ObjectId, ref: 'Kindergarden' }],
});

const DirectorModel = mongoose.model('Director', directorSchema);

module.exports = { DirectorModel };
