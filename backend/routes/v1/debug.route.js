const express = require("express");
const debugController = require("../../controllers/debug.controller");
const asyncHandler = require("../../helper/asyncHandler");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

// Admin-only test email endpoint
router.post(
  "/send-test-email",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(debugController.sendTestEmail)
);

module.exports = router;
   