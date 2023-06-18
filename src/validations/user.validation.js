const Joi = require('joi');
const mongoose = require('mongoose');

const userValidationSchema = Joi.object({
  role: Joi.string()
    .valid('director', 'assistant', 'parent')
    .required()
    .messages({
      'any.only':
        'You can choose only one of the following roles: director, user, assistant, parent',
      'any.required': 'Role is required',
    }),
  firstName: Joi.string().required().messages({
    'any.required': 'Please enter your first name',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'Please enter your last name',
  }),
  phone: Joi.number().required().messages({
    'any.required': 'Please enter your phone number',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Please enter your address',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Please provide your email',
    'string.email': 'Please provide a valid email',
  }),
  photo: Joi.string().default('default.jpg'),

  password: Joi.string().required().min(8).messages({
    'any.required': 'Please provide a password',
    'string.min': 'Password must be at least 8 characters long',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Please confirm your password',
    'any.only': 'Passwords are not the same!',
  }),
  passwordChangedAt: Joi.date(),
  passwordResetToken: Joi.string(),
  passwordResetExpires: Joi.date(),
  active: Joi.boolean().default(true),
  kindId: Joi.number().when('role', {
    is: 'parent',
    then: Joi.number().required().messages({
      'any.required': 'You have to enter ID for the kid!',
    }),
    otherwise: Joi.number().optional(),
  }),
  kindFirstName: Joi.string().when('role', {
    is: 'parent',
    then: Joi.string().required().messages({
      'any.required': 'You have to enter the kid name!',
    }),
    otherwise: Joi.string().optional(),
  }),
  HMO: Joi.string()
    .valid('Clalit', 'Maccabi', 'Meuhedet', 'Leumit')
    .when('role', {
      is: 'parent',
      then: Joi.string().required().messages({
        'any.required': 'You have to enter an HMO!',
      }),
      otherwise: Joi.string().optional(),
    }),
  allergies: Joi.string().optional(),
  attended: [{ type: mongoose.Schema.ObjectId, ref: 'Attendance' }],
  chat: [{ type: mongoose.Schema.ObjectId, ref: 'Chat' }],
}).options({ abortEarly: false });

module.exports = userValidationSchema;
