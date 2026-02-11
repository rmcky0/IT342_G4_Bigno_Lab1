import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount (try backend /me first)
    let mounted = true;
    (async () => {
      try {
        const fetched = await authService.fetchCurrentUser();
        if (mounted && fetched) {
          setUser(fetched);
          setLoading(false);
          return;
        }
      } catch (e) {
        // ignore and fallback to token-derived user
      }

      const currentUser = authService.getCurrentUser();
      if (mounted) {
        setUser(currentUser);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleAppLogout = () => {
      setUser(null);
    };

    window.addEventListener("app:logout", handleAppLogout);
    return () => {
      window.removeEventListener("app:logout", handleAppLogout);
    };
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      // try to get authoritative user info from backend
      const fetched = await authService.fetchCurrentUser();
      setUser(fetched || authService.getCurrentUser());
      return { success: true, data: response };
    } catch (error) {
      const serverMsg =
        error.response?.data?.error || error.response?.data?.message;
      // Normalize common auth error to a user-friendly message
      if (
        serverMsg &&
        serverMsg.toLowerCase().includes("invalid credentials")
      ) {
        return {
          success: false,
          error: "Invalid email or password. Please try again.",
        };
      }
      return {
        success: false,
        error: serverMsg || error.message || "Login failed",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authService.register(username, email, password);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
