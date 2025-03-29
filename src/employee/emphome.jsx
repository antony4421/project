import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/emphome.css";
import appImage from "./images/slider-dec.png";
import { Link } from "react-router-dom";

export const Emphome = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState("Employee"); // Default name
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
      fetchEmployeeName(storedEmployeeId);  // Fetch employee name
      checkAttendanceStatus(storedEmployeeId);  // Check attendance status
    }
  }, []);

  // Fetch employee details to get the name
  const fetchEmployeeName = async (id) => {
    try {
      const response = await fetch(`http://localhost:8005/api/employees/${id}`);
      const data = await response.json();

      if (response.ok) {
        setEmployeeName(data.name); // Set the employee name
      } else {
        console.error("Failed to fetch employee details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  // Function to check attendance status
  const checkAttendanceStatus = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/attendance/employee/${id}`
      );
      const data = await response.json();

      if (response.ok) {
        const today = new Date().toISOString().split("T")[0];
        const attendanceToday = data.find(
          (attendance) => attendance.date === today
        );

        if (attendanceToday) {
          setIsCheckedIn(!!attendanceToday.checkInTime);
          setIsCheckedOut(!!attendanceToday.checkOutTime);
        } else {
          setIsCheckedIn(false);
          setIsCheckedOut(false);
        }
      } else {
        console.error("Failed to fetch attendance:", data.message);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Function to mark check-in
  const markAttendance = async () => {
    if (!employeeId) {
      alert("Employee ID not found. Please log in again.");
      return;
    }

    if (isCheckedIn) {
      alert("You have already marked attendance for today.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8005/api/attendance/mark?employeeId=${employeeId}`,
        { method: "POST" }
      );

      if (response.ok) {
        alert("Attendance Marked Successfully!");
        setIsCheckedIn(true);
        setIsCheckedOut(false);
      } else {
        alert("Failed to Mark Attendance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  // Function to mark check-out
  const markLogoutAttendance = async () => {
    if (!employeeId) {
      alert("Employee ID not found. Please log in again.");
      return;
    }

    if (isCheckedOut) {
      alert("You have already marked logout attendance.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8005/api/attendance/logout?employeeId=${employeeId}`,
        { method: "PUT" }
      );

      if (response.ok) {
        alert("Logout Attendance Marked Successfully!");
        setIsCheckedOut(true);
      } else {
        alert("Failed to Mark Logout Attendance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="landing-container">
        {/* Transparent Navbar */}
        <nav className="custom-navbar">
          <h1 className="custom-logo">HR SOLUTION</h1>
          <ul className="custom-nav-links">
            <li className="custom-nav-item"><Link to="/emphome">Home</Link></li>
            <li className="custom-nav-item">
              <Link to="/empdash">Services</Link>
            </li>
            <li className="custom-nav-item"><Link to="/payslip">Payslip</Link></li>
            <li className="custom-nav-item">
              <Link to="/socialchat">Social</Link>
            </li>
          </ul>
          <button className="custom-signin-btn"><Link to="/login">Logout</Link></button>
        </nav>

        {/* Image Section */}
        <div className="hero-image">
          <img
            src={appImage}
            alt="Mobile App Illustration"
            className="custom-image"
          />
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h2 className="hero-title">Welcome {employeeName}</h2>  {/* Dynamic Employee Name */}
            <p className="hero-description">
              Attendance is not just about showing up; it's about being present,
              engaged, and making a difference.
            </p>
            <div className="hero-buttons">
              {!isCheckedIn ? (
                <button
                  className="custom-button apple-button"
                  onClick={markAttendance}
                >
                  Mark Attendance 🍏
                </button>
              ) : (
                <button
                  className="custom-button logout-button"
                  onClick={markLogoutAttendance}
                  disabled={isCheckedOut} // Disable if already logged out
                >
                  {isCheckedOut
                    ? "Logout Attendance Marked ✅"
                    : "Mark Logout Attendance 🔴"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emphome;
