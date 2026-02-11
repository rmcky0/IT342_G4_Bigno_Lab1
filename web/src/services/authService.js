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
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      const id = payload.sub || null;
      const usernameFromToken = payload.username || null;

      return {
        id,
        username: usernameFromToken || payload.sub || null,
      };
    } catch (e) {
      return null;
    }
  }

  async fetchCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const resp = await apiClient.get(`${AUTH_PATH}/me`);
      const data = resp.data;
      return {
        id: data.userId || null,
        username: data.username || null,
        email: data.email || null,
      };
    } catch (e) {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
