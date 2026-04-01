const Joi = require("joi");

const updateUserProfileValidation = Joi.object({
  tags: Joi.array().items(Joi.string()).optional(),
  title: Joi.string().optional(),
  bio: Joi.string().optional(),
  social: Joi.object({
    linkedin: Joi.string().optional(),
    github: Joi.string().optional(),
    twitter: Joi.string().optional(),
    facebook: Joi.string().optional(),
    instagram: Joi.string().optional(),
  }).optional(),
  college: Joi.string().optional(),
});

const updateUserRoleValidation = Joi.object({
  role: Joi.string()
    .valid("mentor", "student", "admin", "analyst", "viewer")
    .required()
    .messages({
      "any.only": "Role must be one of: mentor, student, admin, analyst, viewer",
      "any.required": "Role is required",
    }),
});

const updateUserStatusValidation = Joi.object({
  status: Joi.string().valid("active", "inactive").required().messages({
    "any.only": "Status must be active or inactive",
    "any.required": "Status is required",
  }),
});

module.exports = {
  updateUserProfileValidation,
  updateUserRoleValidation,
  updateUserStatusValidation,
};
