const Joi = require("joi");

const createFinanceRecordValidation = Joi.object().keys({
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be greater than 0",
    "any.required": "Amount is required",
  }),
  type: Joi.string().valid("income", "expense").required().messages({
    "any.only": "Type must be income or expense",
    "any.required": "Type is required",
  }),
  category: Joi.string().trim().min(1).max(100).required().messages({
    "string.min": "Category cannot be empty",
    "string.max": "Category must not exceed 100 characters",
    "any.required": "Category is required",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid ISO date",
    "any.required": "Date is required",
  }),
  notes: Joi.string().trim().max(500).optional().allow("").messages({
    "string.max": "Notes must not exceed 500 characters",
  }),
});

const updateFinanceRecordValidation = Joi.object()
  .keys({
    amount: Joi.number().positive().optional().messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
    }),
    type: Joi.string().valid("income", "expense").optional().messages({
      "any.only": "Type must be income or expense",
    }),
    category: Joi.string().trim().min(1).max(100).optional().messages({
      "string.min": "Category cannot be empty",
      "string.max": "Category must not exceed 100 characters",
    }),
    date: Joi.date().iso().optional().messages({
      "date.base": "Date must be a valid ISO date",
    }),
    notes: Joi.string().trim().max(500).optional().allow("").messages({
      "string.max": "Notes must not exceed 500 characters",
    }),
  })
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

module.exports = {
  createFinanceRecordValidation,
  updateFinanceRecordValidation,
};
