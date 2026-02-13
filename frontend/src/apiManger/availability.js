import AxiosInstances from ".";

const getMentorAvailability = async (mentorId, duration) => {
  const dur = Number(duration) || 30;
  return await AxiosInstances.get(
    `availability/${mentorId}?durationInMinutes=${dur}`
  );
};

const getOwnAvailability = async () => {
  return await AxiosInstances.get("/availability");
};

const createAvailability = async (data) => {
  return await AxiosInstances.post("/availability", data);
};

const updateAvailability = async (data) => {
  return await AxiosInstances.put("/availability", data);
};

export default {
  getMentorAvailability,
  getOwnAvailability,
  createAvailability,
  updateAvailability,
};
