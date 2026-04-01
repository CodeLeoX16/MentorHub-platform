const express = require("express");
const rateLimit = require("express-rate-limit");
const asyncHandler = require("../../helper/asyncHandler");
const { protect, restrictTo } = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const financeController = require("../../controllers/finance.controller");
const {
  createFinanceRecordValidation,
  updateFinanceRecordValidation,
} = require("../../validations/finance.validation");

const router = express.Router();

// Apply a general rate limiter to all finance routes (100 req/15 min per IP)
const financeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

router.use(financeRateLimiter);

// All finance routes require authentication
router.use(protect);

// ─── Dashboard / summary endpoints (Analyst + Admin) ───────────────────────
router.get(
  "/dashboard/summary",
  restrictTo("analyst", "admin"),
  asyncHandler(financeController.getDashboardSummary)
);

router.get(
  "/dashboard/categories",
  restrictTo("analyst", "admin"),
  asyncHandler(financeController.getCategoryBreakdown)
);

router.get(
  "/dashboard/recent",
  restrictTo("analyst", "admin"),
  asyncHandler(financeController.getRecentActivity)
);

router.get(
  "/dashboard/trends",
  restrictTo("analyst", "admin"),
  asyncHandler(financeController.getMonthlyTrends)
);

// ─── Financial record CRUD ──────────────────────────────────────────────────

// Create — Admin only
router.post(
  "/records",
  restrictTo("admin"),
  validate(createFinanceRecordValidation),
  asyncHandler(financeController.createRecord)
);

// List / Read — Viewer, Analyst, Admin
router.get(
  "/records",
  restrictTo("viewer", "analyst", "admin"),
  asyncHandler(financeController.listRecords)
);

router.get(
  "/records/:id",
  restrictTo("viewer", "analyst", "admin"),
  asyncHandler(financeController.getRecord)
);

// Update — Admin only
router.put(
  "/records/:id",
  restrictTo("admin"),
  validate(updateFinanceRecordValidation),
  asyncHandler(financeController.updateRecord)
);

// Delete (soft) — Admin only
router.delete(
  "/records/:id",
  restrictTo("admin"),
  asyncHandler(financeController.deleteRecord)
);

module.exports = router;
