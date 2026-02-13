const Razorpay = require("razorpay");
const crypto = require("crypto");
const moment = require("moment");
const bookingService = require("../services/booking.service");
const httpStatus = require("../util/httpStatus");
const serviceService = require("../services/service.service");
const config = require("../config");
const zoomService = require("../services/zoom.service");
const emailService = require("../services/email.service");

const initiateBookingAndPayment = async (req, res, next) => {
  const { dateAndTime, serviceId } = req.body;

  const service = await serviceService.getServiceById(serviceId);

  // Create a new booking
  const newBooking = await bookingService.createBooking({
    user: req.user._id,
    mentor: service.mentor,
    dateAndTime,
    service: serviceId,
    price: service.price,
  });

  // Initialize Razorpay instance
  const razorpay = new Razorpay(config.razorpay);

  // Create an order in Razorpay
  const options = {
    amount: service.price * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_order_${newBooking._id}`,
    payment_capture: 1,
    notes: {
      bookingId: newBooking._id,
    },
  };

  const order = await razorpay.orders.create(options);

  // Send response with booking and payment details
  res.status(httpStatus.created).json({
    booking: newBooking,
    order,
  });
};

const getBookings = async (req, res, next) => {
  const bookings = await bookingService.getUsersBooking(req.user._id);
  res.status(httpStatus.ok).json({ success: true, bookings });
};

const getMentorBookings = async (req, res, next) => {
  const bookings = await bookingService.getMentorBookings(req.user._id);
  res.status(httpStatus.ok).json({ success: true, bookings });
};

const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const hmac = crypto.createHmac("sha256", config.razorpay.key_secret);
  hmac.update(`${orderId}|${paymentId}`);
  const digest = hmac.digest("hex");
  return digest === signature;
};

const confirmBooking = async (req, res, next) => {
  const { orderId, paymentId, signature, bookingId } = req.body;

  if (!verifyRazorpaySignature(orderId, paymentId, signature)) {
    return res
      .status(httpStatus.badRequest)
      .json({ success: false, message: "Payment verification failed" });
  }

  const booking = await bookingService.getBookingById(bookingId);

  if (!booking) {
    return res
      .status(httpStatus.notFound)
      .json({ success: false, message: "Booking not found" });
  }

  const zoomMeeting = await zoomService.createScheduledZoomMeeting(
    booking.dateAndTime,
    booking.service.duration
  );

  const updatedBooking = await bookingService.updateBookingById(bookingId, {
    meetingLink: zoomMeeting,
    status: "confirmed",
  });

  await emailService.sendConfirmationMail(
    booking.user.email,
    booking.user.name,
    zoomMeeting,
    moment(booking.dateAndTime).format("DD-MM-YYYY"),
    moment(booking.dateAndTime).format("HH:mm")
  );

  return res.status(httpStatus.ok).json({ success: true, booking: updatedBooking });
};

module.exports = {
  initiateBookingAndPayment,
  getBookings,
  getMentorBookings,
  confirmBooking,
};
