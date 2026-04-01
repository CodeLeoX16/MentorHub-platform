const UserModel = require("../models/user.model");

const getUserById = async (id) => {
  return await UserModel.findById(id);
};

const updateUser = async (id, data) => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

const updateUserPhoto = async (id, photoUrl) => {
  return await UserModel.findByIdAndUpdate(id, { photoUrl }, { new: true });
};

const updateUserProfile = async (id, profileData) => {
  return await UserModel.findByIdAndUpdate(
    id,
    { profile: profileData },
    { new: true }
  );
};

const listUsers = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    UserModel.find().select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
    UserModel.countDocuments(),
  ]);
  return {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const updateUserRole = async (id, role) => {
  // Use String() to ensure role is always a primitive string, never an object
  return await UserModel.findByIdAndUpdate(id, { role: String(role) }, { new: true }).select("-password");
};

const updateUserStatus = async (id, status) => {
  // Use String() to ensure status is always a primitive string, never an object
  return await UserModel.findByIdAndUpdate(id, { status: String(status) }, { new: true }).select("-password");
};

const countActiveAdmins = async () => {
  return await UserModel.countDocuments({ role: "admin", status: "active" });
};

module.exports = {
  getUserById,
  updateUser,
  updateUserPhoto,
  updateUserProfile,
  listUsers,
  updateUserRole,
  updateUserStatus,
  countActiveAdmins,
};
