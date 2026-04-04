import AxiosInstances from '.';

const getCounts = async () => {
  return await AxiosInstances.get('/admin/counts');
};

const getBookingStats = async () => {
  return await AxiosInstances.get('/admin/bookings');
};

const adminApi = { getCounts, getBookingStats };
export default adminApi;
  