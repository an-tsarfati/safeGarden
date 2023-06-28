const Joi = require('joi');

const attendanceValidationSchema = Joi.object({
  body: Joi.object({
    role: Joi.string().required().messages({
      'any.only':
        'You can choose only one of the following roles: director, user, assistant, parent',
      'any.required': 'Role is required',
    }),
    kindId: Joi.number().required().messages({
      'any.required': 'You have to enter ID for the kid!',
    }),
    status: Joi.string()
      .valid('arrived', 'sick', 'vacation')
      .required()
      .messages({
        'any.only':
          'You can choose only one of the following roles: arrived, sick, vacation',
      }),
    timestamp: Joi.date().default(Date.now),
  }).options({ abortEarly: false }),
  query: Joi.allow(''),
  params: Joi.allow(''),
});

module.exports = attendanceValidationSchema;
