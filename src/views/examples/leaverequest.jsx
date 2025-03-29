import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./components/Sidebar/Sidebar";
import "./css/leaverequest.css"; 

const LeaveRequestTable = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [employees, setEmployees] = useState({}); // Store employee details by ID

    useEffect(() => {
        // Fetch leave requests from the backend
        axios.get('http://localhost:8005/api/leave-requests')  // Ensure this endpoint is correct
            .then(response => {
                setLeaveRequests(response.data);
                // Fetch employee details for all leave requests at once
                const employeeIds = response.data.map(request => request.employeeId);
                fetchEmployeeDetails(employeeIds);
            })
            .catch(error => {
                console.error('There was an error fetching the leave requests!', error);
            });
    }, []);

    // Fetch employee details in bulk and store them in the state
    const fetchEmployeeDetails = (employeeIds) => {
        employeeIds.forEach(employeeId => {
            if (!employees[employeeId]) {  // Fetch employee data only if not already cached
                axios.get(`http://localhost:8005/api/employees/${employeeId}`)
                    .then(response => {
                        setEmployees(prevState => ({
                            ...prevState,
                            [employeeId]: response.data // Store the fetched employee data in state
                        }));
                    })
                    .catch(error => {
                        console.error('There was an error fetching the employee details!', error);
                    });
            }
        });
    };

    // Get employee name by employeeId from the state
    const getEmployeeName = (employeeId) => {
        return employees[employeeId] ? employees[employeeId].name : 'Loading...'; // Return employee name or "Loading..."
    };
    const handleStatusChange = (id, newStatus) => {
        axios.put(`http://localhost:8005/api/leave-requests/${id}`, { status: newStatus }) // ✅ Send status in request body
            .then(response => {
                // ✅ Update the UI immediately after a successful API call
                setLeaveRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: newStatus } : request
                    )
                );
            })
            .catch(error => {
                console.error("Error updating leave request status:", error);
            });
    };
    
    
    return (
        <div className='add-employee-layout'>
            <Sidebar />
            <div className="leavetable-container">
                <h2>Leave Requests</h2>
                <table className="leave-request-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>REQUEST ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests.map((request) => (
                            <tr key={request.Id}>
                                <td>{getEmployeeName(request.employeeId)}</td> {/* Fetch employee name by employeeId */}
                                <td>{request.id}</td>
                                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                <td>{request.status}</td>
                                <td>{request.reason}</td>
                                <td>
    {request.status === "PENDING" && (
        <>
            <button onClick={() => handleStatusChange(request.id, "APPROVED")} className="approve-btn">
                Approve
            </button>
            <button onClick={() => handleStatusChange(request.id, "REJECTED")} className="reject-btn">
                Reject
            </button>
        </>
    )}
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveRequestTable;
