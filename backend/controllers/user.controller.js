const cloudinary = require("cloudinary").v2;
const config = require("../config");
const userService = require("../services/user.service");
const ApiError = require("../helper/apiError");
const httpStatus = require("../util/httpStatus");
// Configure Cloudinary
cloudinary.config(config.cloudinary);

const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_photos",
      use_filename: true,
    });

    // Update user with new photo URL
    const updatedUser = await userService.updateUserPhoto(
      req.user._id,
      result.secure_url
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Photo uploaded successfully",
      photoUrl: updatedUser.photoUrl,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Error uploading photo" });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.getUserById(userId);

  if (!user) {
    return next(new ApiError(httpStatus.notFound, "User not found"));
  }

  res.status(httpStatus.ok).json({
    success: true,
    user,
  });
};

const updateUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  const profileData = req.body;

  const updatedUser = await userService.updateUserProfile(userId, profileData);

  if (!updatedUser) {
    return next(new ApiError(httpStatus.notFound, "User not found"));
  }

  res.status(httpStatus.ok).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
};

// ─── Admin: user management ──────────────────────────────────────────────────

const listUsers = async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));

  const result = await userService.listUsers({ page, limit });

  res.status(httpStatus.ok).json({
    success: true,
    ...result,
  });
};

const setUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await userService.updateUserRole(id, role);

  if (!user) {
    return next(new ApiError(httpStatus.notFound, "User not found"));
  }

  res.status(httpStatus.ok).json({
    success: true,
    message: `User role updated to ${role}`,
    user,
  });
};

const setUserStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // Prevent admin from deactivating themselves
  if (String(req.user._id) === String(id)) {
    return next(
      new ApiError(httpStatus.badRequest, "You cannot change your own status")
    );
  }

  // Prevent deactivating the last active admin
  if (status === "inactive") {
    const targetUser = await userService.getUserById(id);
    if (targetUser && targetUser.role === "admin") {
      const activeAdminCount = await userService.countActiveAdmins();
      if (activeAdminCount <= 1) {
        return next(
          new ApiError(
            httpStatus.badRequest,
            "Cannot deactivate the last active admin account"
          )
        );
      }
    }
  }

  const user = await userService.updateUserStatus(id, status);

  if (!user) {
    return next(new ApiError(httpStatus.notFound, "User not found"));
  }

  res.status(httpStatus.ok).json({
    success: true,
    message: `User status updated to ${status}`,
    user,
  });
};

module.exports = {
  uploadPhoto,
  getUser,
  updateUserProfile,
  listUsers,
  setUserRole,
  setUserStatus,
};
