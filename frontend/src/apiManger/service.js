import AxiosInstances from ".";

const createService = async (data) => {
  return await AxiosInstances.post("/service", data);
};

const getAllServices = async () => {
  return await AxiosInstances.get("/service");
};

const editService = async (id, data) => {
  return await AxiosInstances.put("/service/" + id, data);
};

const getServiceById = async (id) => {
  return await AxiosInstances.get(`/service/${id}`);
};

const deleteService = async (serviceId) => {
  return await AxiosInstances.delete(`/service/admin/${serviceId}`);
};
   
const getAllServicesAdmin = async () => {
  return await AxiosInstances.get(`/service/admin`);
};

const updateServiceAdmin = async (serviceId, data) => {
  return await AxiosInstances.put(`/service/admin/${serviceId}`, data);
};

const serviceApi = { getAllServices, createService, editService, getServiceById, deleteService, getAllServicesAdmin, updateServiceAdmin };

export default serviceApi;
