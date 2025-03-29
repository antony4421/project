import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./css/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8005/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");

        // Store employee details in localStorage
        localStorage.setItem("employeeId", data.id);
        localStorage.setItem("employeePosition", data.position);

        // Redirect based on position
        switch (data.position) {
          case "HR":
            navigate("/company");
            break;
          case "Manager":
            navigate("/company");
            break;
          case "Admin":
            navigate("/company");
            break;
          case "Employee":
            navigate("/emphome");
            break;
          default:
            navigate("/emphome");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <GoogleOAuthProvider clientId="674922687302-p29d84haa39vo7noht7t1rgbvjph97gt.apps.googleusercontent.com">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p>Have an account?</p>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="social-login">
            <p>— Or Sign In With —</p>
            <GoogleLogin onSuccess={() => {}} onError={() => {}} />
          </div>

          <div className="register-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
