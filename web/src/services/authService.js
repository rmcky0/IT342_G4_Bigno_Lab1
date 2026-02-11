import apiClient from "./apiClient";

const AUTH_PATH = "/auth";

class AuthService {
  async register(username, email, password) {
    const response = await apiClient.post(`${AUTH_PATH}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  }

  async login(username, password) {
    const response = await apiClient.post(`${AUTH_PATH}/login`, {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username,
        }),
      );
    }

    return response.data;
  }

  async logout() {
    try {
      await apiClient.post(`${AUTH_PATH}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
