import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
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

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // optional: if (error.response?.status === 401) { /* handle logout */ }
//     return Promise.reject(error);
//   },
// );

export default apiClient;
