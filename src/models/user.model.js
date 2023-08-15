const mongoose = require('mongoose');
const userValidationSchema = require('../validations/user.validation');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['director', 'parent'],
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
      lowercase: true,
      unique: true,
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    children: [{ type: mongoose.Schema.ObjectId, ref: 'Child' }],
    kindergarden: [{ type: mongoose.Schema.ObjectId, ref: 'Kindergarden' }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

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

// userSchema.pre(/^find/, function (next) {
//   if (this.options._recursed) {
//     return next();
//   }
//   this.populate({
//     path: 'kindergarden children',
//     options: { _recursed: true },
//     select: '-__v -passwordChangedAt',
//   });
//   next();
// });

// userSchema.post(/^find/, async function (docs) {
//   const populatePromises = docs.map(async (doc) => {
//     if (doc.role === 'parent') {
//       await doc.populate('children').execPopulate();
//     } else if (doc.role === 'teacher' || doc.role === 'director') {
//       await doc.populate('kindergarden').execPopulate();
//     }
//   });

//   await Promise.all(populatePromises);
// });

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

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel, userSchema, userValidationSchema };
