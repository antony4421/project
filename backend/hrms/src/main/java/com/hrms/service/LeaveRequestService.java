package com.hrms.service;

import com.hrms.entity.LeaveRequest;
import com.hrms.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    // Get all leave requests
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    // Get leave requests by employee ID
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    // Create a new leave request
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        leaveRequest.setStatus(LeaveRequest.LeaveStatus.PENDING); // Default status
        return leaveRequestRepository.save(leaveRequest); // Save to DB and return the saved entity
    }

    // Delete leave request(s) based on employee ID
    public void deleteLeaveRequestsByEmployeeId(Long employeeId) {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findByEmployeeId(employeeId);

        if (leaveRequests.isEmpty()) {
            throw new RuntimeException("No leave requests found for employee with ID: " + employeeId);
        }

        leaveRequestRepository.deleteAll(leaveRequests);  // Delete all leave requests of the employee
    }
}
