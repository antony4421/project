package com.hrms.service;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.hrms.repository.AttendanceRepository;
import com.hrms.repository.EmployeeRepository;
import com.hrms.entity.Attendance;
import com.hrms.entity.Employee;

@Service
public class AttendanceScheduler {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceScheduler.class);
    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceScheduler(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    

    // ✅ Scheduled task to run every night at 11:59 PM
    @Scheduled(cron = "59 59 23 * * *")
    public void markAbsentForMissingAttendance() {
        int daysToCheck = 7; // Change this to check for more days
        logger.info("🔄 Running scheduled task to mark absentees for the past {} days", daysToCheck);

        List<Employee> allEmployees = employeeRepository.findAll();

        for (int i = 1; i <= daysToCheck; i++) {
            LocalDate pastDate = LocalDate.now().minusDays(i);
            logger.info("Checking attendance for date: {}", pastDate);

            for (Employee employee : allEmployees) {
                boolean hasAttendance = attendanceRepository.existsByEmployeeIdAndDate(employee.getId(), pastDate);
                if (!hasAttendance) {
                    Attendance absentEntry = new Attendance();
                    absentEntry.setEmployeeId(employee.getId());
                    absentEntry.setDate(pastDate);
                    absentEntry.setStatus("Absent");
                    attendanceRepository.save(absentEntry);
                    logger.info("❌ Marked Absent: Employee ID {} for {}", employee.getId(), pastDate);
                }
            }
        }
        logger.info("✅ Scheduled task completed: Past absentees updated.");
    }
}
