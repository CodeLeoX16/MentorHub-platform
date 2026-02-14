import AxiosInstances from ".";

const authApi = {
  signup: (data) => AxiosInstances.post("/auth/signup", data),
  signin: (data) => AxiosInstances.post("/auth/signin", data),
};

export default authApi;
