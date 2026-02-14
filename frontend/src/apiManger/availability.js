import AxiosInstances from ".";

const availabilityApi = {
  getMentorAvailability: async (mentorId, duration) => {
    const dur = Number(duration) || 30;
    return AxiosInstances.get(
      `availability/${mentorId}?durationInMinutes=${dur}`
    );
  },
  getOwnAvailability: async () => AxiosInstances.get("/availability"),
  createAvailability: async (data) => AxiosInstances.post("/availability", data),
  updateAvailability: async (data) => AxiosInstances.put("/availability", data),
};

export default availabilityApi;
