import AxiosInstances from ".";

// Define the functions
const getAllMentors = () => {
  return AxiosInstances.get("/mentor");
};

const getMentorByUsername = (userName) => {
  return AxiosInstances.get("/mentor/" + userName);
};

const deleteMentor = (id) => {
  return AxiosInstances.delete(`/mentor/admin/${id}`);
};

const getMentorStats = () => {
  return AxiosInstances.get(`/mentor/admin/stats`);
};

// Assign the object to a variable
const mentorAPI = {
  getAllMentors,   
  getMentorByUsername,
  deleteMentor,
  getMentorStats,
};

// Export the variable as default
export default mentorAPI;
