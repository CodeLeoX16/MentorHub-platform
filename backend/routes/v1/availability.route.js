const express = require("express");
const {
  createAvailabilityValidation,
} = require("../../validations/availability.validation");
const availabilityController = require("../../controllers/availability.controller");
const asyncHandler = require("../../helper/asyncHandler");
const validate = require("../../middleware/validate");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  validate(createAvailabilityValidation),
  asyncHandler(availabilityController.createAvailability)
);

router.put(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  validate(createAvailabilityValidation),
  asyncHandler(availabilityController.updateAvailability)
);

router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(availabilityController.getAvailability)
);

// Admin routes to manage mentor availability (place before param route)
router.get(
  "/admin/:mentorId",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(availabilityController.adminGetAvailability)
);

router.put(
  "/admin/:mentorId",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  validate(createAvailabilityValidation),
  asyncHandler(availabilityController.adminUpdateAvailability)
);

router.get(
  "/:mentorId",
  authMiddleware.protect,
  asyncHandler(availabilityController.getNext14DaysAvailability)
);   

module.exports = router;
