const ServiceModel = require("../models/service.model");
const httpStatus = require("../util/httpStatus");
const ApiError = require("../helper/apiError");
const serviceService = require("../services/service.service");

const createService = async (req, res, next) => {
  const mentorId = req.user._id;

  const { name, description, duration, price } = req.body;

  const service = await serviceService.createService({
    mentor: mentorId,
    name,
    description,
    duration,
    price,
  });

  res.status(httpStatus.created).json({
    success: true,
    message: "Service created successfully",
    service,
  });
};

const updateService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const mentorId = req.user._id;
  const { name, description, duration, price, active } = req.body;

  const updatedService = await serviceService.updateService(
    serviceId,
    mentorId,
    {
      name,
      description,
      duration,
      price,
      active,
    }
  );

  if (!updatedService) {
    throw new ApiError(
      httpStatus.notFound,
      "Service not found or you don't have permission to update it"
    );
  }

  res.status(httpStatus.ok).json({
    success: true,
    message: "Service updated successfully",
    service: updatedService,
  });
};

const getServiceByMentor = async (req, res, next) => {
  const mentorId = req.user._id;

  const services = await serviceService.getServiceByMentor(mentorId);

  res.status(httpStatus.ok).json({
    success: true,
    services,
  });
};

const getServiceById = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const service = await serviceService.getServiceById(serviceId);

  res.status(httpStatus.ok).json({
    success: true,
    service,
  });
};

// Admin: delete any service
const deleteService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const deleted = await serviceService.deleteServiceById(serviceId);
  if (!deleted) {
    return next(new ApiError(httpStatus.notFound, "Service not found"));
  }
  res.status(httpStatus.ok).json({ success: true, message: "Service deleted" });
};

// Admin: get all services
const getAllServices = async (req, res, next) => {
  const services = await serviceService.getAllServices();
  res.status(httpStatus.ok).json({ success: true, services });
};   

// Admin: update any service
const adminUpdateService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const updateData = req.body;
  const updated = await serviceService.updateServiceById(serviceId, updateData);
  if (!updated) {
    return next(new ApiError(httpStatus.notFound, "Service not found"));
  }
  res.status(httpStatus.ok).json({ success: true, service: updated });
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
  deleteService,
  getAllServices,
  adminUpdateService,
};
