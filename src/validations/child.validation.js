const Joi = require('joi');

const childValidationSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': "Please enter the child's first name",
    }),
    lastName: Joi.string().required().messages({
      'any.required': "Please enter the child's last name",
    }),
    photo: Joi.string().default('default.jpg'),
    kidId: Joi.number().when('role', {
      is: 'parent',
      then: Joi.number().required().messages({
        'any.required': "You have to enter the child's ID",
      }),
      otherwise: Joi.number().optional(),
    }),
    HMO: Joi.string().when('role', {
      is: 'parent',
      then: Joi.string().required().messages({
        'any.required': 'You have to enter an HMO',
      }),
      otherwise: Joi.string().optional(),
    }),
    alergies: Joi.string().optional(),
    attended: Joi.array().items(Joi.string()),
    parent: Joi.array().items(Joi.string()),
  }).options({ abortEarly: false }),
  query: Joi.allow(''),
  params: Joi.allow(''),
});

module.exports = childValidationSchema;
