import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import "./css/payslip.css";

const EmployeePayslip = () => {
  const [payslip, setPayslip] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const employeeId = localStorage.getItem("employeeId"); // Get Employee ID from local storage

  useEffect(() => {
    if (!employeeId) {
      setError("Employee ID not found.");
      setLoading(false);
      return;
    }

    const fetchPayslip = async () => {
      try {
        const response = await fetch(`http://localhost:8005/api/payslip/last/${employeeId}`);
        if (!response.ok) throw new Error("Failed to fetch payslip");

        const data = await response.json();
        setPayslip(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchEmployeeName = async () => {
      try {
        const response = await fetch(`http://localhost:8005/api/employees/${employeeId}`);
        if (!response.ok) throw new Error("Failed to fetch employee details");

        const data = await response.json();
        setEmployeeName(data.name);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    const fetchData = async () => {
      await fetchPayslip();
      await fetchEmployeeName();
      setLoading(false);
    };

    fetchData();
  }, [employeeId]);

  const downloadPayslip = () => {
    const payslipElement = document.getElementById("payslip");
    html2canvas(payslipElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Payslip_${employeeName}_${payslip?.monthYear}.pdf`);
    });
  };

  if (loading) return <p>Loading payslip...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!payslip) return <p>No payslip available for this month.</p>;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="landing2">
      {/* Transparent Navbar */}
      <nav className="custom-navbar">
        <h1 className="custom-logo">HR SOLUTION</h1>
        <ul className="custom-nav-links">
          <li className="custom-nav-item"><Link to="/emphome">Home</Link></li>
          <li className="custom-nav-item"><Link to="/empdash">Services</Link></li>
          <li className="custom-nav-item"><Link to="/payslip">Payslip</Link></li>
          <li className="custom-nav-item"><Link to="/socialchat">Social</Link></li>
        </ul>
        <button className="custom-signin-btn"><Link to="/login">Logout</Link></button>
      </nav>

      <div id="payslip" className="payslip-container">
        <h2 className="payslip-header">SALARY SLIP</h2>
        <p className="confidential">CONFIDENTIAL</p>
        <div className="employee-details">
          <p><strong>Name:</strong> {employeeName}</p>
          <p><strong>Employee ID:</strong> {payslip.employeeId}</p>
          <p><strong>Month:</strong> {payslip.monthYear}</p>
          <p><strong>Total Work Days:</strong> {payslip.totalWorkDays}</p>
          <p><strong>Present Days:</strong> {payslip.totalPresentDays}</p>
          <p><strong>Leave Days:</strong> {payslip.totalLeaveDays}</p>
          <p><strong>Absent Days:</strong> {payslip.totalAbsentDays}</p>
        </div>

        <table className="payslip-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Salary</td>
              <td>{formatCurrency(payslip.totalSalary)}</td>
            </tr>
          </tbody>
        </table>

        <div className="net-pay">
          <p>NET PAY: {formatCurrency(payslip.totalSalary)}</p>
        </div>

        <button className="download-btn" onClick={downloadPayslip}>Download PDF</button>
      </div>
    </div>
  );
};

export default EmployeePayslip;
