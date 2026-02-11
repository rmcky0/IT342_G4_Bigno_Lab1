import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ maxWidth: 720 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "1.25rem" }}>
              Hello, {user.username}
            </h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.7)" }}>
              Welcome back — here is your dashboard.
            </p>
          </div>
          <div>
            <button className="auth-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 12,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <p style={{ margin: "6px 0" }}>
            <strong>Username:</strong> {user.username}
          </p>
          <p style={{ margin: "6px 0" }}>
            <strong>Email:</strong> {user.email || "(not available)"}
          </p>
          <p style={{ margin: "6px 0" }}>
            <strong>Status:</strong> Authenticated
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
