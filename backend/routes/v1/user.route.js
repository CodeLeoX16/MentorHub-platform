const express = require("express");
const rateLimit = require("express-rate-limit");
const userController = require("../../controllers/user.controller");
const asyncHandler = require("../../helper/asyncHandler");
const { protect, restrictTo } = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const validate = require("../../middleware/validate");
const {
  updateUserProfileValidation,
  updateUserRoleValidation,
  updateUserStatusValidation,
} = require("../../validations/user.validation");

const router = express.Router();

// Rate limiter for regular user endpoints (60 req/15 min per IP)
const userRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

// Rate limiter for admin user management routes (30 req/15 min per IP)
const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

// ─── Own-user endpoints ─────────────────────────────────────────────────────

router.post(
  "/upload-photo",
  userRateLimiter,
  protect,
  upload.single("photo"),
  asyncHandler(userController.uploadPhoto)
);

router.get("/", userRateLimiter, protect, asyncHandler(userController.getUser));

router.put(
  "/update-profile",
  userRateLimiter,
  protect,
  validate(updateUserProfileValidation),
  asyncHandler(userController.updateUserProfile)
);

// ─── Admin: user management ─────────────────────────────────────────────────

router.get(
  "/admin/list",
  adminRateLimiter,
  protect,
  restrictTo("admin"),
  asyncHandler(userController.listUsers)
);

router.patch(
  "/admin/:id/role",
  adminRateLimiter,
  protect,
  restrictTo("admin"),
  validate(updateUserRoleValidation),
  asyncHandler(userController.setUserRole)
);

router.patch(
  "/admin/:id/status",
  adminRateLimiter,
  protect,
  restrictTo("admin"),
  validate(updateUserStatusValidation),
  asyncHandler(userController.setUserStatus)
);

module.exports = router;
