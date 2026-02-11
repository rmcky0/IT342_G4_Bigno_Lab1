import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      try {
        window.dispatchEvent(
          new CustomEvent("app:logout", { detail: { reason: "unauthorized" } }),
        );
      } catch (e) {}
    }
    return Promise.reject(error);
  },
);

export default apiClient;
