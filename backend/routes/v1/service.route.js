const express = require("express");
const serviceController = require("../../controllers/service.controller");
const asyncHandler = require("../../helper/asyncHandler");
const validate = require("../../middleware/validate");
const {
  createServiceSchema,
  updateServiceSchema,
} = require("../../validations/service.validation");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.post(
  "/",
  validate(createServiceSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.createService)
);

router.put(
  "/:serviceId",
  validate(updateServiceSchema),
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.updateService)
);

router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceByMentor)
);

// Admin routes (place before param route to avoid conflicts)
router.delete(
  "/admin/:serviceId",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(serviceController.deleteService)
);

router.get(
  "/admin",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(serviceController.getAllServices)
);

router.put(
  "/admin/:serviceId",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  asyncHandler(serviceController.adminUpdateService)
);

router.get(
  "/:serviceId",
  authMiddleware.protect,
  asyncHandler(serviceController.getServiceById)
);

module.exports = router;
