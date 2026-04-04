const Joi = require("joi");

const createTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().max(100).optional(),
  date: Joi.date().required(),
  notes: Joi.string().max(500).optional(),
});

const updateTransactionSchema = Joi.object({
  amount: Joi.number().optional(),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().max(100).optional(),
  date: Joi.date().optional(),
  notes: Joi.string().max(500).optional(),
});

const listTransactionsSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional(),
  startDate: Joi.date().optional(),  
  endDate: Joi.date().optional(),
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsSchema,
};
