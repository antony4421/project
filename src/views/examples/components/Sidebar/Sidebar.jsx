import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css"; // Import CSS for styling

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={`custom-sidebar-container ${isMinimized ? "custom-minimized" : ""}`}>
      <button className="custom-sidebar-toggle" onClick={() => setIsMinimized(!isMinimized)}>
        ☰
      </button>
      <h2 className="custom-sidebar-title">{!isMinimized && "Dashboard"}</h2>
      <button className="custom-sidebar-button" onClick={() => navigate("/company")}>
        <span className="custom-sidebar-icon home-icon"></span> {!isMinimized && "Home"}
      </button>
      <button className="custom-sidebar-button" onClick={() => navigate("/employee")}>
        <span className="custom-sidebar-icon employees-icon"></span> {!isMinimized && "Employees"}
      </button>
      <button className="custom-sidebar-button" onClick={() => navigate("/paysliplist")}>
        <span className="custom-sidebar-icon reports-icon"></span> {!isMinimized && "payroll"}
      </button>
      <button className="custom-sidebar-button" onClick={() => navigate("/chatapp")}>
        <span className="custom-sidebar-icon tasks-icon"></span> {!isMinimized && "social"}
      </button>
      <button className="custom-sidebar-button" onClick={() => navigate("/event")}>
        <span className="custom-sidebar-icon calendar-icon"></span> {!isMinimized && "Calendar"}
      </button>
      <button className="custom-sidebar-button" onClick={() => navigate("/leaverequest")}>
        <span className="custom-sidebar-icon messages-icon"></span> {!isMinimized && "Request"}
      </button>
      <button className="custom-sidebar-button custom-mt-auto" onClick={() => navigate("/login")}>
        <span className="custom-sidebar-icon settings-icon"></span> {!isMinimized && "logout"}
      </button>
    </div>
  );
};

export default Sidebar;
