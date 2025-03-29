import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import Sidebar from "./components/Sidebar/Sidebar";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8005";

const UserProfileForm = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="user-form">
    {[
      { label: "Full Name", name: "name", type: "text" },
      { label: "Email", name: "email", type: "email", disabled: true },
      { label: "Phone Number", name: "phoneNumber", type: "text" },
      { label: "Department", name: "department", type: "text" },
      { label: "Position", name: "position", type: "text" },
      { label: "Salary", name: "salary", type: "number" },
      { label: "Hire Date", name: "hireDate", type: "date" },
      { label: "Address", name: "address", type: "text" },
    ].map(({ label, name, type, disabled }) => (
      <div className="field-wrapper" key={name}>
        <label className="field-label">{label}</label>
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className="field-input"
          placeholder={label}
          disabled={disabled}
        />
      </div>
    ))}
    <div className="field-wrapper">
      <label className="field-label">Status</label>
      <select
        name="status"
        value={formData.status || ""}
        onChange={handleChange}
        className="field-input"
      >
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
    <div className="action-buttons">
      <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
        Back To Home
      </button>
      <button type="submit" className="btn-primary">Save Changes</button>
    </div>
  </form>
);

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      fetch(`${API_BASE_URL}/api/employees/${employeeId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching employee data:", err);
          alert("Failed to fetch employee data.");
          setLoading(false);
        });
    }
  }, [employeeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="user-dashboard-container">
      <Sidebar />
      <div className="user-profile-box">
        <div className="user-form-section">
          <h2 className="user-heading">Edit Profile</h2>
          <div className="user-image-wrapper">
            <img className="user-avatar" src="https://via.placeholder.com/100" alt="Profile" />
          </div>
          {loading ? <p>Loading profile...</p> : <UserProfileForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />}
        </div>
        <div className="user-options-panel">
          <h3 className="panel-heading">Options</h3>
          <ul className="panel-list">
            <li className="panel-item">About Us</li>
            <li className="panel-item">Contact</li>
            <li className="panel-item">Help</li>
            <li className="panel-item">FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;