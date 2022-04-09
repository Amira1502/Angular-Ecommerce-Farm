// require joi
const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};
// registre validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};
// login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

// update user 
const updateUserValidation = (data) => {
  const schema = Joi.object({
    id_user: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
    name: Joi.string().required().strict(),
  });

  return schema.validate(data, options);
};

// export module
module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
};