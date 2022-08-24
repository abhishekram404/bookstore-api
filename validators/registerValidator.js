const Joi = require("joi");
const registerValidator = Joi.object({
  fullName: Joi.string().min(3).max(60).required().trim().messages({
    "string.base": "FullName must be of type text",
    "string.min": "FullName must be of at least 3 characters.",
    "string.max": "FullName can't be more than 60 characters.",
    "any.required": "FullName is required.",
  }),
  username: Joi.string().alphanum().min(3).max(16).required().trim().messages({
    "string.base": "Username must be of type text",
    "string.min": "Username must be of at least 3 characters.",
    "string.max": "Username can't be more than 16 characters.",
    "any.required": "Username is required.",
  }),
  email: Joi.string().email().required().trim().messages({
    "string.base": "Email must be of type text",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.base": "Password must be of type text",
    "string.min": "Password must be of at least 6 characters.",
    "string.max": "Password can't be more than 255 characters.",
    "any.required": "Password is required.",
  }),
  phone: Joi.string()
    .pattern(
      /(\+)?(977)?-?(980|981|982|984|985|986|974|975|972|963|961|962|988)[0-9]{7}/
    )
    .required()
    .messages({
      "string.pattern.base": "Phone number is not valid.",
      "any.required": "Phone number is required.",
    }),
});

module.exports = registerValidator;
