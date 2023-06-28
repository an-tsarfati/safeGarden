const Joi = require('joi');

const kindergardenValidationSchema = Joi.object({
  body: Joi.object({
    kindergardenName: Joi.string().required().messages({
      'any.required': 'Please enter your name',
    }),
    kindergardenAddress: Joi.string().required().messages({
      'any.required': 'Please enter the adress',
    }),
    kindergardenClasses: Joi.string(),
    kindergardenWorkHours: Joi.string().required().messages({
      'any.required': 'Please enter the working hours',
    }),
    director: Joi.array().items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': 'Director ID is required',
          'string.pattern.base': 'Invalid Director ID',
        })
    ),
  }).options({ abortEarly: false }),
  query: Joi.allow(''),
  params: Joi.allow(''),
});

module.exports = kindergardenValidationSchema;
