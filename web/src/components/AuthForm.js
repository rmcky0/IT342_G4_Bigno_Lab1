import React, { useState } from "react";

const AuthForm = ({ mode = "login", onSubmit, loading }) => {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(
        mode === "login"
          ? { username: form.username, password: form.password }
          : {
              username: form.username,
              email: form.email,
              password: form.password,
            },
      );
    } catch (err) {
      setError(err?.message || "An error occurred");
    }
  };

  return (
    <div>
      {mode === "register" ? (
        <>
          <h2 className="auth-title">Create an account</h2>
          <p className="auth-desc">
            Build your neural profile and start exploring securely.
          </p>
        </>
      ) : (
        <>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-desc">
            Sign in to reconnect with your protected workspace.
          </p>
        </>
      )}

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={submit}>
        <div className="auth-fields">
          {mode === "register" && (
            <div className="auth-field">
              <label className="sr-only" htmlFor="auth-username">
                Username
              </label>
              <input
                id="auth-username"
                name="username"
                className="auth-input"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
                required
              />
              <span className="auth-underline" />
              <span className="auth-glow" />
            </div>
          )}

          {mode === "register" && (
            <div className="auth-field">
              <label className="sr-only" htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="Email address"
                onChange={handleChange}
                value={form.email}
                required
              />
              <span className="auth-underline" />
              <span className="auth-glow" />
            </div>
          )}

          {mode === "login" && (
            <div className="auth-field full">
              <label className="sr-only" htmlFor="auth-login-username">
                Username
              </label>
              <input
                id="auth-login-username"
                name="username"
                className="auth-input"
                placeholder="Username or email"
                onChange={handleChange}
                value={form.username}
                required
              />
              <span className="auth-underline" />
              <span className="auth-glow" />
            </div>
          )}

          {mode === "login" ? (
            <div className="auth-field full">
              <label className="sr-only" htmlFor="auth-login-password">
                Password
              </label>
              <input
                id="auth-login-password"
                name="password"
                type="password"
                className="auth-input has-icon"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
              />
              <svg
                className="auth-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2a5 5 0 0 1 5 5v3h1.25A2.75 2.75 0 0 1 21 12.75v6.5A2.75 2.75 0 0 1 18.25 22h-12.5A2.75 2.75 0 0 1 3 19.25v-6.5A2.75 2.75 0 0 1 5.75 10H7V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z" />
              </svg>
              <span className="auth-underline" />
              <span className="auth-glow" />
            </div>
          ) : (
            <div className="auth-field full">
              <label className="sr-only" htmlFor="auth-register-password">
                Password
              </label>
              <input
                id="auth-register-password"
                name="password"
                type="password"
                className="auth-input has-icon"
                placeholder="Create a password"
                onChange={handleChange}
                value={form.password}
                required
              />
              <svg
                className="auth-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2a5 5 0 0 1 5 5v3h1.25A2.75 2.75 0 0 1 21 12.75v6.5A2.75 2.75 0 0 1 18.25 22h-12.5A2.75 2.75 0 0 1 3 19.25v-6.5A2.75 2.75 0 0 1 5.75 10H7V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z" />
              </svg>
              <span className="auth-underline" />
              <span className="auth-glow" />
            </div>
          )}
        </div>

        <button className="auth-button" type="submit" disabled={loading}>
          {loading
            ? mode === "login"
              ? "Signing in..."
              : "Creating account..."
            : mode === "login"
              ? "Sign in"
              : "Create an account"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
