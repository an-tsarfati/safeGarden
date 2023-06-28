const mongoose = require('mongoose');
const userValidationSchema = require('../validations/user.validation');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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
    attended: [{ type: mongoose.Schema.ObjectId, ref: 'Attendance' }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model('users', userSchema);

module.exports = { UserModel, userValidationSchema };
