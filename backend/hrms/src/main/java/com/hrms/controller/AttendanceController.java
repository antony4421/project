package com.hrms.controller;

import com.hrms.entity.Attendance;
import com.hrms.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(@RequestParam(required = true) Long employeeId) {
        if (employeeId == null) {
            return ResponseEntity.badRequest().body("Employee ID is required.");
        }

        LocalDate today = LocalDate.now();
        LocalTime checkInTime = LocalTime.now();

        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setDate(today);
        attendance.setCheckInTime(checkInTime);
        attendance.setStatus("Present");

        Attendance savedAttendance = attendanceService.saveAttendance(attendance);
        return ResponseEntity.ok(savedAttendance);
    }

    
    @PutMapping("/logout")
    public ResponseEntity<String> markLogoutAttendance(@RequestParam Long employeeId) {
        Attendance attendance = attendanceService.getTodayAttendanceByEmployeeId(employeeId);

        if (attendance == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Attendance not found for today.");
        }

        if (attendance.getCheckOutTime() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already logged out.");
        }

        attendance.setCheckOutTime(LocalTime.now());
        attendanceService.saveAttendance(attendance);

        return ResponseEntity.ok("Logout attendance marked successfully!");
    }
    
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAttendanceById(@PathVariable Long id) {
        Optional<Attendance> attendance = attendanceService.getAttendanceById(id);
        return attendance.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getAttendanceByEmployeeId(@PathVariable Long employeeId) {
        List<Attendance> attendanceRecords = attendanceService.getAttendanceByEmployeeId(employeeId);
        if (attendanceRecords.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(attendanceRecords);
    }

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        Attendance savedAttendance = attendanceService.saveAttendance(attendance);
        return ResponseEntity.ok(savedAttendance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}
