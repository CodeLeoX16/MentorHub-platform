const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const adminController = require('../../controllers/admin.controller');
const { protect, restrictTo } = require('../../middleware/auth');

const router = express.Router();

router.get('/counts', protect, restrictTo('admin'), asyncHandler(adminController.getCounts));
router.get('/bookings', protect, restrictTo('admin'), asyncHandler(adminController.getBookingStats));

module.exports = router;
   