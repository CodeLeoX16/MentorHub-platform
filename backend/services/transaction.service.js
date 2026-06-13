const Transaction = require("../models/transaction.model");

const createTransaction = async (data) => {
  return await Transaction.create(data);
};

const getTransactionById = async (id) => {
  return await Transaction.findById(id).where({ isDeleted: false });
};

const updateTransaction = async (id, data) => {
  return await Transaction.findByIdAndUpdate(id, data, { new: true });
};

const deleteTransaction = async (id) => {
  // soft-delete
  return await Transaction.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
   
const queryTransactions = async (filter = {}, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;   

  const docs = await Transaction.find({ ...filter, isDeleted: false })
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Transaction.countDocuments({ ...filter, isDeleted: false });

  return { docs, total, page: Number(page), limit: Number(limit) };
};

const exportTransactions = async (filter = {}) => {
  // return all matching transactions (no pagination) for export
  const docs = await Transaction.find({ ...filter, isDeleted: false }).sort({ date: -1 });
  return docs;
};

const aggregateSummary = async (filter = {}) => {
  const match = { ...filter, isDeleted: false };

  const totals = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const byCategory = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" },
      },
    },
  ]);

  return { totals, byCategory };
};

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  queryTransactions,
  aggregateSummary,
  exportTransactions,
};
