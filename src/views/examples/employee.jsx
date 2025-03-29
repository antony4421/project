import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar/Sidebar";
import "./css/EmployeeList.css";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8005/api/employees")
      .then(response => {
        // Filter out employees with position 'Admin'
        const filteredEmployees = response.data.filter(emp => emp.position !== "Admin");
        setEmployees(filteredEmployees);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8005/api/employees/${id}`);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="landing11">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Sidebar />
          <div className="main-content">
            <div className="employee-container">
              <div className="employee-header">
                <h2>Employee List</h2>
                <div className="employee-actions">
                  <button className="add-button" onClick={() => navigate("/addemp")}>Add Employee</button>
                  <button className="toggle-button" onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}>
                    {viewMode === "card" ? "Switch to List View" : "Switch to Card View"}
                  </button>
                </div>
              </div>

              {loading ? (
                <p>Loading employees...</p>
              ) : viewMode === "card" ? (
                <div className="employee-card-grid">
                  {employees.map(emp => (
                    <div key={emp.id} className="employee-card">
                      <h3>{emp.name}</h3>
                      <p>{emp.email}</p>
                      <p>{emp.position}</p>
                      <p>{emp.department}</p>
                      <p>{emp.phoneNumber}</p>
                      <div className="employee-actions">
                        
                        <button className="edit-button" onClick={() => navigate(`/editemp/${emp.id}`)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(emp.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="employee-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.position}</td>
                        <td>{emp.department}</td>
                        <td>{emp.phoneNumber}</td>
                        <td>
                          <button className="view-button" onClick={() => navigate(`/employee/${emp.id}`)}>View</button>
                          <button className="edit-button" onClick={() => navigate(`/editemp/${emp.id}`)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDelete(emp.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
