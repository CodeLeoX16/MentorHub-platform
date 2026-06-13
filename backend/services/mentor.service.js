const ServiceModel = require("../models/service.model");
const UserModel = require("../models/user.model");

const getAllMentors = async () => {
  return await UserModel.find({ role: "mentor" });
};

const getMentorById = async (id) => {
  return await UserModel.findOne({ _id: id, role: "mentor" });
};

const getMentorByUsername = async (username) => {
  return await UserModel.findOne({ username, role: "mentor" });
};
    
const getMentorServices = async (id) => {
  return await ServiceModel.find({ mentor: id, active: true });
};

const deleteMentorById = async (id) => {   
  // remove services associated with mentor
  await ServiceModel.deleteMany({ mentor: id });
  // remove the mentor user
  return await UserModel.findByIdAndDelete(id);
};

const getMentorStats = async () => {
  // return counts grouped by year-month
  return await UserModel.aggregate([
    { $match: { role: "mentor" } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);
};

module.exports = {
  getAllMentors,
  getMentorById,
  getMentorByUsername,
  getMentorServices,
  deleteMentorById,
  getMentorStats,
};
