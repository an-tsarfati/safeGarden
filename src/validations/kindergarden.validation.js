const Joi = require('joi');

const kindergardenValidationSchema = Joi.object({
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
});

module.exports = kindergardenValidationSchema;
