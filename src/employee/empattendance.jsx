import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/empattendance.css";
import { Link } from "react-router-dom";

const AttendanceCalendar = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
      fetchAttendance(storedEmployeeId);
    }
  }, []);

  const fetchAttendance = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/attendance/employee/${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setAttendanceData(data);
      } else {
        console.error("fetch-attendance-error", data.message);
      }
    } catch (error) {
      console.error("fetch-attendance-exception", error);
    }
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "work-hours-na";

    const checkInTime = new Date(`1970-01-01T${checkIn}`);
    const checkOutTime = new Date(`1970-01-01T${checkOut}`);

    const diff = (checkOutTime - checkInTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return diff.toFixed(2); // Round to 2 decimal places
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("en-CA");
    const details = attendanceData.find((a) => a.date === formattedDate);
    setAttendanceDetails(details);
  };

  return (
    <div className="landing-container22">
      {/* Transparent Navbar */}
      <nav className="custom-navbar">
        <h1 className="custom-logo">HR SOLUTION</h1>
        <ul className="custom-nav-links">
          <li className="custom-nav-item">
            <Link to="/emphome">Home</Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/empdash">Services</Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/payslip">Payslip</Link>
          </li>
          <li className="custom-nav-item">
            <Link to="/socialchat">Social</Link>
          </li>
        </ul>
        <button className="custom-signin-btn">Profile</button>
      </nav>

      <div className="attendance-wrapper1">
        <div className="calendar-container1">
          <Calendar
            className="attendance-calendar"
            onClickDay={handleDateClick}
            tileContent={({ date }) => {
              const formattedDate = date.toLocaleDateString("en-CA");
              const record = attendanceData.find((a) => a.date === formattedDate);

              if (record) {
                return record.checkInTime ? (
                  <span className="attendance-checkmark">✔</span> // Present
                ) : (
                  <span className="attendance-cross">✖</span> // Absent
                );
              }
              return null;
            }}
            tileClassName={({ date }) => {
              const formattedDate = date.toLocaleDateString("en-CA");
              const record = attendanceData.find((a) => a.date === formattedDate);

              if (record) {
                return record.checkInTime ? "calendar-day-present" : "calendar-day-absent";
              }
              return "calendar-day-default";
            }}
          />
        </div>

        {selectedDate && (
          <div className="attendance-side-panel">
            <h3 className="panel-title">Attendance Details</h3>
            <p className="panel-date">Date: {selectedDate.toDateString()}</p>
            {attendanceDetails ? (
              <>
                <p className="panel-checkin">
                  Check-in:{" "}
                  <span className="checkin-time">{attendanceDetails.checkInTime || "N/A"}</span>
                </p>
                <p className="panel-checkout">
                  Check-out:{" "}
                  <span className="checkout-time">{attendanceDetails.checkOutTime || "N/A"}</span>
                </p>
                <p className="panel-hours">
                  Work Hours:{" "}
                  <span className="work-hours-value">
                    {calculateWorkHours(attendanceDetails.checkInTime, attendanceDetails.checkOutTime)} hrs
                  </span>
                </p>
              </>
            ) : (
              <p className="panel-no-record">No attendance record for this day.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
