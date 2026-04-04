const mentorService = require("../services/mentor.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../util/httpStatus");

const getMentorInfoByUsername = async (req, res, next) => {
  const { username } = req.params;

  const mentor = await mentorService.getMentorByUsername(username);

  if (!mentor) {
    return next(new ApiError(httpStatus.notFound, "Mentor not found"));
  }

  const services = await mentorService.getMentorServices(mentor._id);

  res.status(httpStatus.ok).json({
    success: true,
    mentor,
    services,
  });
};

const getAllMentors = async (req, res, next) => {
  const mentors = await mentorService.getAllMentors();

  res.status(httpStatus.ok).json({
    success: true,
    mentors,
  });
};

const deleteMentor = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await mentorService.deleteMentorById(id);
  if (!deleted) {
    return next(new ApiError(httpStatus.notFound, "Mentor not found"));
  }
  res.status(httpStatus.ok).json({ success: true, message: "Mentor deleted" });
};

const getMentorStats = async (req, res, next) => {
  const stats = await mentorService.getMentorStats();
  res.status(httpStatus.ok).json({ success: true, stats });
};

module.exports = {
  getMentorInfoByUsername,
  getAllMentors,
  deleteMentor,
  getMentorStats,
};
