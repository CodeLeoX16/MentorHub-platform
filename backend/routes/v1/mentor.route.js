const express = require("express");
const mentorController = require("../../controllers/mentor.controller");
const asyncHandler = require("../../helper/asyncHandler");
const { protect, restrictTo } = require("../../middleware/auth");


const router = express.Router();

// Admin-only actions (declare before param routes to avoid conflicts)
router.delete(
  "/admin/:id",
  protect,
  restrictTo("admin"),
  asyncHandler(mentorController.deleteMentor)
);

router.get(
  "/admin/stats",
  protect,
  restrictTo("admin"),
  asyncHandler(mentorController.getMentorStats)
);   

router.get("/", asyncHandler(mentorController.getAllMentors));

router.get(
  "/:username",
  asyncHandler(mentorController.getMentorInfoByUsername)
);

module.exports = router;
   