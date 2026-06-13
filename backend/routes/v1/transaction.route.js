const express = require("express");
const transactionController = require("../../controllers/transaction.controller");
const asyncHandler = require("../../helper/asyncHandler");
const validate = require("../../middleware/validate");
const authMiddleware = require("../../middleware/auth");
const {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsSchema,
} = require("../../validations/transaction.validation");

const router = express.Router();

// Create - Admin only
router.post(
  "/",
  validate(createTransactionSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(transactionController.createTransaction)
);     

// List - Viewer/Analyst/Admin
router.get(
  "/",
  validate(listTransactionsSchema, "query"),
  authMiddleware.protect,
  authMiddleware.restrictTo("viewer", "analyst", "admin"),
  asyncHandler(transactionController.getTransactions)
);

// Summary - Analyst/Admin/Viewer (view access)
router.get(
  "/summary",
  authMiddleware.protect,
  authMiddleware.restrictTo("viewer", "analyst", "admin"),
  asyncHandler(transactionController.summary)
);

// Export CSV - Admin only
router.get(
  "/export",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(transactionController.exportCsv)
);

// Get by id
router.get(
  "/:transactionId",
  authMiddleware.protect,
  authMiddleware.restrictTo("viewer", "analyst", "admin"),
  asyncHandler(transactionController.getTransaction)
);

// Update - Admin only
router.put(
  "/:transactionId",
  validate(updateTransactionSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(transactionController.updateTransaction)
);

// Delete - Admin only (soft-delete)
router.delete(
  "/:transactionId",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(transactionController.deleteTransaction)
);

module.exports = router;
