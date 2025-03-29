import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import "./css/add.css";

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
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
  });

  // Fetch employee details when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8005/api/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          alert("Failed to fetch employee details");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8005/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee updated successfully!");
        navigate(-1); // Go back to the previous page
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="add-employee-layout">
      <Sidebar />
      <div className="add-employee-content">
        <button className="add-employee-back-btn" onClick={() => navigate(-1)}>Back</button>
        <div className="add-employee-container">
          <h2 className="add-employee-title">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="add-employee-form">
            <div className="add-employee-group">
              <label>Name:</label>
              <input type="text" name="name" value={employee.name} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Email:</label>
              <input type="email" name="email" value={employee.email} onChange={handleChange} required disabled />
            </div>
            <div className="add-employee-group">
              <label>Phone Number:</label>
              <input type="text" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Department:</label>
              <input type="text" name="department" value={employee.department} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Position:</label>
              <select name="position" value={employee.position} onChange={handleChange} required>
                <option value="">Select Position</option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="add-employee-group">
              <label>Salary:</label>
              <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Hire Date:</label>
              <input type="date" name="hireDate" value={employee.hireDate} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Address:</label>
              <input type="text" name="address" value={employee.address} onChange={handleChange} required />
            </div>
            <div className="add-employee-group">
              <label>Status:</label>
              <select name="status" value={employee.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <button type="submit" className="add-employee-submit-btn">Update Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
