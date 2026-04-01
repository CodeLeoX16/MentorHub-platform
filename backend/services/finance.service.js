const FinanceModel = require("../models/finance.model");

/**
 * Build a MongoDB query filter from request query params.
 * Only returns non-deleted records.
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFilter = ({ type, category, startDate, endDate }) => {
  const filter = { deletedAt: null };

  if (type) filter.type = type;
  if (category) filter.category = new RegExp(escapeRegex(category), "i");
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  return filter;
};

/**
 * Create a new financial record.
 */
const createRecord = async (data) => {
  return await FinanceModel.create(data);
};

/**
 * List records with optional filters and pagination.
 */
const listRecords = async ({ type, category, startDate, endDate, page = 1, limit = 20 }) => {
  const filter = buildFilter({ type, category, startDate, endDate });
  const skip = (page - 1) * limit;

  const [records, total] = await Promise.all([
    FinanceModel.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email role"),
    FinanceModel.countDocuments(filter),
  ]);

  return {
    records,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single record by ID (non-deleted).
 */
const getRecordById = async (id) => {
  return await FinanceModel.findOne({ _id: id, deletedAt: null }).populate(
    "createdBy",
    "name email role"
  );
};

/**
 * Update a record by ID.
 * Only allow the safe set of fields to reach MongoDB.
 */
const updateRecord = async (id, data) => {
  const { amount, type, category, date, notes } = data;
  const safeUpdate = {};
  if (amount !== undefined) safeUpdate.amount = amount;
  if (type !== undefined) safeUpdate.type = type;
  if (category !== undefined) safeUpdate.category = category;
  if (date !== undefined) safeUpdate.date = date;
  if (notes !== undefined) safeUpdate.notes = notes;

  return await FinanceModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: safeUpdate },
    { new: true, runValidators: true }
  );
};

/**
 * Soft-delete a record by ID.
 */
const deleteRecord = async (id) => {
  return await FinanceModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
};

/**
 * Dashboard: total income, total expenses, net balance.
 */
const getTotals = async () => {
  const result = await FinanceModel.aggregate([
    { $match: { deletedAt: null } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpenses = 0;

  result.forEach((r) => {
    if (r._id === "income") totalIncome = r.total;
    if (r._id === "expense") totalExpenses = r.total;
  });

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
  };
};

/**
 * Dashboard: category-wise totals.
 */
const getCategoryTotals = async () => {
  return await FinanceModel.aggregate([
    { $match: { deletedAt: null } },
    {
      $group: {
        _id: { type: "$type", category: "$category" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id.type",
        category: "$_id.category",
        total: 1,
        count: 1,
      },
    },
    { $sort: { type: 1, total: -1 } },
  ]);
};

/**
 * Dashboard: recent activity (last N records by when they were created).
 */
const getRecentActivity = async (limit = 10) => {
  return await FinanceModel.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("createdBy", "name email");
};

/**
 * Dashboard: monthly trends for the last N months.
 */
const getMonthlyTrends = async (months = 6) => {
  const since = new Date();
  since.setMonth(since.getMonth() - months);

  return await FinanceModel.aggregate([
    { $match: { deletedAt: null, date: { $gte: since } } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        type: "$_id.type",
        total: 1,
        count: 1,
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);
};

module.exports = {
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  getTotals,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
};
