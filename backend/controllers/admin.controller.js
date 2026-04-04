const UserModel = require('../models/user.model');
const BookingModel = require('../models/booking.model');
const httpStatus = require('../util/httpStatus');

const getCounts = async (req, res, next) => {
  // count mentees (students), mentors, admins, total users
  const totalUsers = await UserModel.countDocuments();
  const menteeCount = await UserModel.countDocuments({ role: 'student' });
  const mentorCount = await UserModel.countDocuments({ role: 'mentor' });
  const adminCount = await UserModel.countDocuments({ role: 'admin' });

  const totalBookings = await BookingModel.countDocuments();

  res.status(httpStatus.ok).json({
    success: true,   
    totalUsers,
    menteeCount,
    mentorCount,
    adminCount,
    totalBookings,
  });
};

const getBookingStats = async (req, res, next) => {
  // bookings by mentor
  const byMentor = await BookingModel.aggregate([
    { $group: { _id: '$mentor', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 50 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'mentor',
      },
    },
    { $unwind: { path: '$mentor', preserveNullAndEmptyArrays: true } },
    { $project: { count: 1, mentor: { _id: '$mentor._id', name: '$mentor.name', email: '$mentor.email', username: '$mentor.username' } } },
  ]);

  // bookings by mentee (user)
  const byUser = await BookingModel.aggregate([
    { $group: { _id: '$user', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 50 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    { $project: { count: 1, user: { _id: '$user._id', name: '$user.name', email: '$user.email', username: '$user.username' } } },
  ]);

  res.status(httpStatus.ok).json({ success: true, byMentor, byUser });
};

module.exports = {
  getCounts,
  getBookingStats,
};
