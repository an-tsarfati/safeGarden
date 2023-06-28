const Joi = require('joi');

const userValidationSchema = Joi.object({
  body: Joi.object({
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

    password: Joi.string().required().messages({
      'any.required': 'Please provide a password',
    }),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match!',
      }),
  }).options({ abortEarly: false }),
  query: Joi.allow(''),
  params: Joi.allow(''),
});

module.exports = userValidationSchema;
