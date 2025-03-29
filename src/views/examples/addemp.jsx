import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import "./css/add.css"; // Ensure you have a CSS file for styling

const AddEmployee = ({ onEmployeeAdded }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    position: "",
    salary: "",
    hireDate: "",
    address: "",
    status: "ACTIVE",
    password: "",
  });

  // Auto-fill hire date with today's date
  useEffect(() => {
    setEmployee((prev) => ({
      ...prev,
      hireDate: new Date().toISOString().split("T")[0],
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!employee.name || !employee.email || !employee.password) {
      alert("Name, Email, and Password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8005/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        setEmployee({
          name: "",
          email: "",
          phoneNumber: "",
          department: "",
          position: "",
          salary: "",
          hireDate: new Date().toISOString().split("T")[0],
          address: "",
          status: "ACTIVE",
          password: "",
        });

        if (onEmployeeAdded) onEmployeeAdded();
      } else {
        alert("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="add-employee-layout">
      <Sidebar />
      <div className="add-employee-content">
        <button className="add-employee-back-btn" onClick={() => navigate(-1)}>Back</button>
        <div className="add-employee-container">
          <h2 className="add-employee-title">Add Employee</h2>
          <form onSubmit={handleSubmit} className="add-employee-form">
            <div className="add-employee-group">
              <label className="add-employee-label">Name:</label>
              <input type="text" name="name" value={employee.name} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Email:</label>
              <input type="email" name="email" value={employee.email} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Phone Number:</label>
              <input type="text" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Department:</label>
              <input type="text" name="department" value={employee.department} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Position:</label>
              <select name="position" value={employee.position} onChange={handleChange} required className="add-employee-select">
                <option value="">Select Position</option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Salary:</label>
              <input type="number" name="salary" value={employee.salary} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Hire Date:</label>
              <input type="date" name="hireDate" value={employee.hireDate} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Address:</label>
              <input type="text" name="address" value={employee.address} onChange={handleChange} required className="add-employee-input" />
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Status:</label>
              <select name="status" value={employee.status} onChange={handleChange} className="add-employee-select">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label className="add-employee-label">Password:</label>
              <input type="password" name="password" value={employee.password} onChange={handleChange} required className="add-employee-input" />
            </div>
            <button type="submit" className="add-employee-submit-btn">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
