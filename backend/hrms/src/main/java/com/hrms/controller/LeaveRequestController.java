package com.hrms.controller;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.hrms.entity.LeaveRequest;
import com.hrms.service.LeaveRequestService;
import org.springframework.http.HttpStatus;
import com.hrms.repository.LeaveRequestRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for this controller
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Create a new leave request

    private final LeaveRequestRepository leaveRequestRepository;
    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        LeaveRequest createdLeaveRequest = leaveRequestService.createLeaveRequest(leaveRequest);
        return new ResponseEntity<>(createdLeaveRequest, HttpStatus.CREATED); // Return the created leave request with status 201
    }


    // Get leave requests by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
    }
    
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }
    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }
    // Update leave request status based on request ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLeaveStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<LeaveRequest> leaveRequestOpt = leaveRequestRepository.findById(id);

        if (leaveRequestOpt.isPresent()) {
            LeaveRequest leaveRequest = leaveRequestOpt.get();
            leaveRequest.setStatus(LeaveRequest.LeaveStatus.valueOf(request.get("status"))); // Convert status from request

            leaveRequestRepository.save(leaveRequest); // Save updated request

            return ResponseEntity.ok(leaveRequest);
        }

        return ResponseEntity.badRequest().body("Leave request not found");
    }
    // Delete leave requests based on employee ID
    @DeleteMapping("/employee/{employeeId}")
    public void deleteLeaveRequests(@PathVariable Long employeeId) {
        leaveRequestService.deleteLeaveRequestsByEmployeeId(employeeId);
    }
}
