const ServiceModel = require("../models/service.model");

const createService = async (serviceData) => {
  return await ServiceModel.create(serviceData);
};

const updateService = async (serviceId, mentorId, updateData) => {
  return await ServiceModel.findOneAndUpdate(
    { _id: serviceId, mentor: mentorId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};   

const getServiceByMentor = async (mentorId) => {
  return await ServiceModel.find({ mentor: mentorId });
};

const getServiceById = async (serviceId) => {
  return await ServiceModel.findById(serviceId);
};

const deleteServiceById = async (serviceId) => {
  // delete the service
  const deleted = await ServiceModel.findByIdAndDelete(serviceId);
  return deleted;
};

const getAllServices = async () => {
  return await ServiceModel.find({});
};

const updateServiceById = async (serviceId, updateData) => {
  return await ServiceModel.findByIdAndUpdate(serviceId, updateData, {
    new: true,
    runValidators: true,
  });
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
  deleteServiceById,
  getAllServices,
  updateServiceById,
};
