const Joi = require('joi');

const validateSchool = (school) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    address: Joi.string().trim().min(5).max(200).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
  });

  return schema.validate(school);
};

module.exports = { validateSchool };