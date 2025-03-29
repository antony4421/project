import { useState, useEffect } from "react";
import axios from "axios";
import "./css/company.css";
import Sidebar from "./components/Sidebar/Sidebar";

const Dashboard = () => {
  const [activePage] = useState("Home");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      axios.get("http://localhost:8005/api/employees"),
      axios.get("http://localhost:8005/api/leave-requests"),
      axios.get("http://localhost:8005/api/payslip")
    ])
      .then(([employeesRes, leaveRes, payslipRes]) => {
        const employeeData = employeesRes.data;
        setEmployees(employeeData);
        setTotalEmployees(employeeData.length);

        const pending = leaveRes.data.filter(request => request.status === "PENDING").length;
        setPendingLeaves(pending);

        setPayslips(payslipRes.data);
      })
      .catch(error => {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Get the latest 5 employees based on hireDate (most recent first)
  const latestEmployees = [...employees]
    .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
    .slice(0, 5);

  return (
    <div className="landing11">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Sidebar />
          <div className="main-content">
            <h1 className="page-title">{activePage}</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <>
                <div className="card-grid">
                  {[
                    { title: "Total Employees", count: totalEmployees, color: "card-blue" },
                    { title: "Pending Leave Requests", count: pendingLeaves, color: "card-yellow" },
                    { title: "Generated Payslips", count: payslips.length, color: "card-green" }
                  ].map((card, index) => (
                    <div key={index} className={`card ${card.color}`}>
                      <h2 className="card-title">{card.title}</h2>
                      <p className="card-count">{card.count}</p>
                    </div>
                  ))}
                </div>

                {/* Employee Status Section */}
                <div className="status-card">
                  <h2 className="status-title">Employee Status</h2>
                  <ul className="status-list">
                    {employees.map((employee, index) => (
                      <li key={index} className="status-item">
                        <span>{employee.name}</span>
                        <span className={`status-badge status-${(employee.status?.toLowerCase() || "unknown").replace(/\s+/g, "")}`}>
                          {employee.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Latest Employees Section */}
                <div className="latest-employees">
                  <h2 className="latest-title">Latest Employees</h2>
                  <ul className="latest-list">
                    {latestEmployees.length > 0 ? (
                      latestEmployees.map((employee, index) => (
                        <li key={index} className="latest-item">
                          <span className="latest-name">{employee.name}</span>
                          <span className="latest-date">Hired on: {new Date(employee.hireDate).toLocaleDateString()}</span>
                        </li>
                      ))
                    ) : (
                      <p>No recent employees added.</p>
                    )}
                  </ul>
                </div>
              </>
            )}

          
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;
