package com.hrms.service;

import com.hrms.entity.Attendance;
import com.hrms.entity.Payslip;
import com.hrms.repository.AttendanceRepository;
import com.hrms.repository.PayslipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
public class PayslipService {

    @Autowired
    private PayslipRepository payslipRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    private static final double DAILY_WAGE = 1000.0;

    public Payslip generatePayslip(Long employeeId, YearMonth monthYear) {
        // Check if a payslip already exists
        Optional<Payslip> existingPayslip = payslipRepository.findByEmployeeIdAndMonthYear(employeeId, monthYear);
        if (existingPayslip.isPresent()) {
            return existingPayslip.get();
        }

        // Calculate salary based on attendance
        LocalDate startDate = monthYear.atDay(1);
        LocalDate endDate = monthYear.atEndOfMonth();
        List<Attendance> attendanceRecords = attendanceRepository.findByEmployeeIdAndDateBetween(employeeId, startDate, endDate);

        int totalWorkDays = monthYear.lengthOfMonth();
        int presentDays = (int) attendanceRecords.stream().filter(a -> "Present".equalsIgnoreCase(a.getStatus())).count();
        int leaveDays = (int) attendanceRecords.stream().filter(a -> "Leave".equalsIgnoreCase(a.getStatus())).count();
        int absentDays = totalWorkDays - (presentDays + leaveDays);
        double totalSalary = presentDays * DAILY_WAGE;

        Payslip payslip = new Payslip(employeeId, monthYear, totalWorkDays, presentDays, leaveDays, absentDays, totalSalary);
        return payslipRepository.save(payslip);
    }

    public Optional<Payslip> getLastMonthPayslip(Long employeeId) {
        return payslipRepository.findLastPayslipByEmployeeId(employeeId);
    }


    public List<Payslip> getAllPayslips() {
        return payslipRepository.findAll();
    }
}
