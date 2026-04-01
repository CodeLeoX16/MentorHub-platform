const financeService = require("../services/finance.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../util/httpStatus");

/**
 * POST /finance/records
 * Admin only — create a financial record.
 */
const createRecord = async (req, res, next) => {
  const { amount, type, category, date, notes } = req.body;

  const record = await financeService.createRecord({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id,
  });

  return res.status(httpStatus.created).json({
    success: true,
    message: "Financial record created successfully",
    record,
  });
};

/**
 * GET /finance/records
 * Viewer, Analyst, Admin — list records with optional filters.
 * Query params: type, category, startDate, endDate, page, limit
 */
const listRecords = async (req, res, next) => {
  const { type, category, startDate, endDate } = req.query;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));

  const result = await financeService.listRecords({
    type,
    category,
    startDate,
    endDate,
    page,
    limit,
  });

  return res.status(httpStatus.ok).json({
    success: true,
    ...result,
  });
};

/**
 * GET /finance/records/:id
 * Viewer, Analyst, Admin — get a single record.
 */
const getRecord = async (req, res, next) => {
  const record = await financeService.getRecordById(req.params.id);

  if (!record) {
    return next(new ApiError(httpStatus.notFound, "Financial record not found"));
  }

  return res.status(httpStatus.ok).json({
    success: true,
    record,
  });
};

/**
 * PUT /finance/records/:id
 * Admin only — update a financial record.
 */
const updateRecord = async (req, res, next) => {
  const record = await financeService.updateRecord(req.params.id, req.body);

  if (!record) {
    return next(new ApiError(httpStatus.notFound, "Financial record not found"));
  }

  return res.status(httpStatus.ok).json({
    success: true,
    message: "Financial record updated successfully",
    record,
  });
};

/**
 * DELETE /finance/records/:id
 * Admin only — soft-delete a financial record.
 */
const deleteRecord = async (req, res, next) => {
  const record = await financeService.deleteRecord(req.params.id);

  if (!record) {
    return next(new ApiError(httpStatus.notFound, "Financial record not found"));
  }

  return res.status(httpStatus.ok).json({
    success: true,
    message: "Financial record deleted successfully",
  });
};

/**
 * GET /finance/dashboard/summary
 * Analyst, Admin — total income, total expenses, net balance.
 */
const getDashboardSummary = async (req, res, next) => {
  const totals = await financeService.getTotals();

  return res.status(httpStatus.ok).json({
    success: true,
    summary: totals,
  });
};

/**
 * GET /finance/dashboard/categories
 * Analyst, Admin — category-wise totals.
 */
const getCategoryBreakdown = async (req, res, next) => {
  const categories = await financeService.getCategoryTotals();

  return res.status(httpStatus.ok).json({
    success: true,
    categories,
  });
};

/**
 * GET /finance/dashboard/recent
 * Analyst, Admin — recent financial activity.
 * Query param: limit (default 10, max 50)
 */
const getRecentActivity = async (req, res, next) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
  const records = await financeService.getRecentActivity(limit);

  return res.status(httpStatus.ok).json({
    success: true,
    records,
  });
};

/**
 * GET /finance/dashboard/trends
 * Analyst, Admin — monthly trends.
 * Query param: months (default 6, max 24)
 */
const getMonthlyTrends = async (req, res, next) => {
  const months = Math.min(24, Math.max(1, parseInt(req.query.months) || 6));
  const trends = await financeService.getMonthlyTrends(months);

  return res.status(httpStatus.ok).json({
    success: true,
    trends,
  });
};

module.exports = {
  createRecord,
  listRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  getDashboardSummary,
  getCategoryBreakdown,
  getRecentActivity,
  getMonthlyTrends,
};
