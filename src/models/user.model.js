const mongoose = require('mongoose');
const userValidationSchema = require('../validations/user.validation');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['director', 'assistant', 'parent'],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },

    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    kidId: {
      type: Number,
      required: function () {
        return this.role === 'parent';
      },
      unique: true,
    },
    kidFirstName: {
      type: String,
      required: function () {
        return this.role === 'parent';
      },
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
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = { userModel, userValidationSchema };
