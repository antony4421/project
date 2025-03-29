import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for autoTable support
import "./css/Paysliplist.css"; // Custom CSS file
import Sidebar from "./components/Sidebar/Sidebar";

const PayslipList = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState({});
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  useEffect(() => {
    // Fetch Payslips
    axios.get("http://localhost:8005/api/payslip")
      .then(response => setPayslips(response.data))
      .catch(error => console.error("Error fetching payslips:", error));

    // Fetch Employees and map Employee ID to Name
    axios.get("http://localhost:8005/api/employees")
      .then(response => {
        const employeeMap = {};
        response.data.forEach(emp => {
          employeeMap[emp.id] = emp.name; // Mapping ID to Name
        });
        setEmployees(employeeMap);
      })
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const viewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
  };

  const downloadPayslip = (payslip) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Payslip", 14, 20);

    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Employee ID", payslip.employeeId],
        ["Employee Name", employees[payslip.employeeId] || "N/A"],
        ["Month & Year", payslip.monthYear],
        ["Total Work Days", payslip.totalWorkDays],
        ["Present Days", payslip.totalPresentDays],
        ["Leave Days", payslip.totalLeaveDays],
        ["Absent Days", payslip.totalAbsentDays],
        ["Total Salary", `$${payslip.totalSalary.toFixed(2)}`],
      ],
    });

    doc.save(`Payslip_${payslip.employeeId}_${payslip.monthYear}.pdf`);
  };

  return (
    <div className="custom-paylist">
      <Sidebar />
      <div className="custom-payslip-container">
        <h2>Payslip Records</h2>
        <table className="custom-payslip-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th> {/* New Column */}
              <th>Month & Year</th>
              <th>Total Work Days</th>
              <th>Present Days</th>
              <th>Leave Days</th>
              <th>Absent Days</th>
              <th>Total Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((payslip) => (
              <tr key={payslip.id}>
                <td>{payslip.employeeId}</td>
                <td>{employees[payslip.employeeId] || "Loading..."}</td> {/* Fetch Name */}
                <td>{payslip.monthYear}</td>
                <td>{payslip.totalWorkDays}</td>
                <td>{payslip.totalPresentDays}</td>
                <td>{payslip.totalLeaveDays}</td>
                <td>{payslip.totalAbsentDays}</td>
                <td>${payslip.totalSalary.toFixed(2)}</td>
                <td>
                  <button className="custom-view-button" onClick={() => viewPayslip(payslip)}>View</button>
                  <button className="custom-download-button" onClick={() => downloadPayslip(payslip)}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPayslip && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-content">
              <h2>Payslip Details</h2>
              <p><strong>Employee ID:</strong> {selectedPayslip.employeeId}</p>
              <p><strong>Employee Name:</strong> {employees[selectedPayslip.employeeId] || "N/A"}</p>
              <p><strong>Month & Year:</strong> {selectedPayslip.monthYear}</p>
              <p><strong>Total Work Days:</strong> {selectedPayslip.totalWorkDays}</p>
              <p><strong>Present Days:</strong> {selectedPayslip.totalPresentDays}</p>
              <p><strong>Leave Days:</strong> {selectedPayslip.totalLeaveDays}</p>
              <p><strong>Absent Days:</strong> {selectedPayslip.totalAbsentDays}</p>
              <p><strong>Total Salary:</strong> ${selectedPayslip.totalSalary.toFixed(2)}</p>
              <button className="custom-close-button" onClick={() => setSelectedPayslip(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayslipList;
