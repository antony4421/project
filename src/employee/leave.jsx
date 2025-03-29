import { useEffect, useState } from "react";
import axios from "axios";
import "./css/leave.css";
import { Link } from "react-router-dom";

export default function LeaveRequestPage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "", // Auto-filled based on logged-in user
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Fetch employeeId from localStorage or auth context
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId"); // Fetch from local storage or auth context
    if (employeeId) {
      setFormData((prev) => ({ ...prev, employeeId }));
      fetchLeaveRequests(employeeId); // Fetch leave requests for the logged-in employee
    }
  }, []);

  // Fetch leave requests from the backend based on employee ID
  const fetchLeaveRequests = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8005/api/leave-requests/employee/${employeeId}`);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get employee ID from localStorage or context
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      alert("Employee ID not found. Please log in again.");
      return;
    }

    // Format startDate and endDate to "YYYY-MM-DD" format
    const formattedStartDate = new Date(formData.startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(formData.endDate).toISOString().split("T")[0];

    // Include employee ID in request
    const leaveRequest = { ...formData, employeeId, startDate: formattedStartDate, endDate: formattedEndDate };

    try {
      const response = await axios.post("http://localhost:8005/api/leave-requests", leaveRequest);
      console.log(response); // Add this line to inspect the response

      if (response.status === 201) {
        alert("Leave request submitted successfully!");
        setFormData({ startDate: "", endDate: "", reason: "" });
        fetchLeaveRequests(employeeId); // Refresh leave requests
      } else {
        alert("Failed to submit leave request.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="landing7">
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

      <div className="leave-page-container">
        <h2 className="leave-title">Request Leave</h2>
        <div className="leave-form-card">
          <form onSubmit={handleSubmit} className="leave-form">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label>Reason</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Request</button>
          </form>
        </div>

        <h2 className="leave-history-title">Leave History</h2>
        <div className="leave-history-grid">
          {leaveRequests.length > 0 ? (
            leaveRequests.map((leave) => (
              <div key={leave.id} className="leave-history-card">
                <div className="leave-history-content">
                  <p><strong>Type:</strong> {leave.reason}</p>
                  <p><strong>Dates:</strong> {leave.startDate} to {leave.endDate}</p>
                  <p><strong>Status:</strong> {leave.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
