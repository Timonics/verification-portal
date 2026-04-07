import axios from "axios";

export const internalApi = axios.create({
  baseURL: "", // relative to current origin
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true, // send cookies to your own API
  timeout: 30000,
});

internalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) return Promise.reject(error.response.data);
    return Promise.reject({
      success: false,
      message: error.message || "Network error",
    });
  },
);
