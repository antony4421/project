import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./css/Login.css"; // Reuse the same CSS for consistency

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Employee data to be sent
    const employeeData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber || null, // Optional
      department: formData.department || null,   // Optional
      password: formData.password,
      hireDate: null,  // Default to null
      salary: null,    // Default to null
      address: null,   // Default to null
      status: "ACTIVE", // Default to active
      position: null,  // Default to null
    };

    try {
      const response = await fetch("http://localhost:8005/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful! Please log in.");
        navigate("/login");
      } else {
        setError(data.message || "Failed to register. Try again.");
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
          <h2>Sign Up</h2>
          <p>Create a new account</p>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number (Optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="department"
                placeholder="Department (Optional)"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
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

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="social-login">
            <p>— Or Sign Up With —</p>
            <GoogleLogin onSuccess={() => {}} onError={() => {}} />
          </div>

          <div className="register-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
