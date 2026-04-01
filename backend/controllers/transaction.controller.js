const transactionService = require("../services/transaction.service");
const httpStatus = require("../util/httpStatus");

const createTransaction = async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  const tx = await transactionService.createTransaction(payload);
  return res.status(httpStatus.created).json({ message: "Transaction created", tx });
};

const getTransactions = async (req, res) => {
  const { page, limit, type, category, startDate, endDate } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const result = await transactionService.queryTransactions(filter, { page, limit });
  return res.status(httpStatus.ok).json(result);
};

const getTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const tx = await transactionService.getTransactionById(transactionId);
  if (!tx) return res.status(httpStatus.notFound).json({ message: "Not found" });
  return res.status(httpStatus.ok).json(tx);
};

const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const tx = await transactionService.updateTransaction(transactionId, req.body);
  return res.status(httpStatus.ok).json({ message: "Updated", tx });
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  await transactionService.deleteTransaction(transactionId);
  return res.status(httpStatus.ok).json({ message: "Deleted" });
};

const summary = async (req, res) => {
  const { startDate, endDate, type, category } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const data = await transactionService.aggregateSummary(filter);
  return res.status(httpStatus.ok).json(data);
};

const exportCsv = async (req, res) => {
  const { startDate, endDate, type, category } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const rows = await transactionService.exportTransactions(filter);

  // Build CSV
  const headers = ["id", "amount", "type", "category", "date", "notes", "createdBy"];
  const csv = [headers.join(",")];

  rows.forEach((r) => {
    const line = [
      r._id,
      r.amount,
      r.type,
      `"${(r.category || "").replace(/"/g, '""')}"`,
      r.date.toISOString(),
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      r.createdBy ? r.createdBy.toString() : "",
    ];
    csv.push(line.join(","));
  });

  const csvContent = csv.join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=transactions_${new Date().toISOString()}.csv`
  );
  return res.status(httpStatus.ok).send(csvContent);
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  summary,
  exportCsv,
};
