import AxiosInstances from ".";
import { BASE_URL } from "../const/env.const";
import { getToken } from "../helper";

const transactionApi = {
  exportCsv: async (params = {}) => {
    // use fetch for binary download so we can control headers cleanly
    const token = getToken();
    const url = new URL(`${BASE_URL}/transaction/export`);
    Object.keys(params || {}).forEach((k) => params[k] !== undefined && url.searchParams.append(k, params[k]));

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    if (!res.ok) throw new Error(`Export failed: ${res.status}`);
    const blob = await res.blob();
    return blob;
  },   
  list: (params) => AxiosInstances.get("/transaction", { params }),
  summary: (params) => AxiosInstances.get("/transaction/summary", { params }),
};

export default transactionApi;
