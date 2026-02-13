const Joi = require("joi");

const initiateBookingValidation = Joi.object({
  serviceId: Joi.string().required(),
  dateAndTime: Joi.string().required(),
});

const confirmBookingValidation = Joi.object({
  orderId: Joi.string().required(),
  paymentId: Joi.string().required(),
  signature: Joi.string().required(),
  bookingId: Joi.string().required(),
});

module.exports = {
  initiateBookingValidation,
  confirmBookingValidation,
};
