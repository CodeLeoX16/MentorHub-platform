import AxiosInstances from ".";

const bookService = async (data) => {
  return await AxiosInstances.post("/booking/initiate-booking", data);
};
const confirmBooking = async (data) => {
  return await AxiosInstances.post("/booking/confirm-booking", data);
};
const getMentorBookings = async () => {
  return await AxiosInstances.get("/booking/mentor");
};
const getStudentBookigs = async () => {
  return await AxiosInstances.get("/booking/");
};

const booking = {
  bookService,
  confirmBooking,
  getMentorBookings,
  getStudentBookigs,
};

export default booking;
