const Joi = require('joi');

const userValidationSchema = Joi.object({
  role: Joi.string()
    .valid('director', 'user', 'assistant', 'parent')
    .required()
    .messages({
      'any.only':
        'You can choose only one of the following roles: director, user, assistant, parent',
      'any.required': 'Role is required',
    }),
  kindergardenId: Joi.string().required(),
  userId: Joi.string().required().messages({
    'any.required': 'Please enter your first name',
  }),
  message: Joi.string().required(),
  timestamp: Joi.date().default(Date.now),
});

module.exports = userValidationSchema;
