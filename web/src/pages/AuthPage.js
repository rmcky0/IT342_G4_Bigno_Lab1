import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import "../styles/auth.css";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const shadowRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMove = (event) => {
      const shadow = shadowRef.current;
      const card = cardRef.current;
      if (!shadow || !card) {
        return;
      }

      const isOverCard = card.contains(event.target);
      if (!isOverCard) {
        shadow.style.opacity = "0";
        return;
      }

      shadow.style.transform = `translate(${event.clientX - 60}px, ${
        event.clientY - 60
      }px)`;
      shadow.style.opacity = "0.5";
    };

    document.body.addEventListener("mousemove", handleMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const handleSubmit = async (payload) => {
    setLoading(true);
    if (mode === "login") {
      const res = await login(payload.username, payload.password);
      setLoading(false);
      if (res.success) {
        navigate("/dashboard");
      } else {
        throw new Error(res.error || "Login failed");
      }
    } else {
      const res = await register(
        payload.username,
        payload.email,
        payload.password,
      );
      setLoading(false);
      if (res.success) {
        // switch to login after successful registration
        setMode("login");
      } else {
        throw new Error(res.error || "Registration failed");
      }
    }
  };

  return (
    <div className="auth-shell">
      <div id="shadow" ref={shadowRef} className="auth-shadow" />
      <div id="card" ref={cardRef} className="auth-card">
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
            aria-selected={mode === "login"}
          >
            Log in
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
            aria-selected={mode === "register"}
          >
            Register
          </button>
        </div>

        <AuthForm mode={mode} onSubmit={handleSubmit} loading={loading} />
        <div className="auth-card-glow" aria-hidden />
      </div>
    </div>
  );
};

export default AuthPage;
