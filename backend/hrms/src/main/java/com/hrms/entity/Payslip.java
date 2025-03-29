package com.hrms.entity;

import jakarta.persistence.*;
import java.time.YearMonth;

@Entity
@Table(name = "payslip")
public class Payslip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId;
    
    @Column(nullable = false)
    private YearMonth monthYear;
    
    private int totalWorkDays;
    private int totalPresentDays;
    private int totalLeaveDays;
    private int totalAbsentDays;
    private double totalSalary;

    public Payslip() {}

    public Payslip(Long employeeId, YearMonth monthYear, int totalWorkDays, int totalPresentDays, int totalLeaveDays, int totalAbsentDays, double totalSalary) {
        this.employeeId = employeeId;
        this.monthYear = monthYear;
        this.totalWorkDays = totalWorkDays;
        this.totalPresentDays = totalPresentDays;
        this.totalLeaveDays = totalLeaveDays;
        this.totalAbsentDays = totalAbsentDays;
        this.totalSalary = totalSalary;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public YearMonth getMonthYear() { return monthYear; }
    public void setMonthYear(YearMonth monthYear) { this.monthYear = monthYear; }

    public int getTotalWorkDays() { return totalWorkDays; }
    public void setTotalWorkDays(int totalWorkDays) { this.totalWorkDays = totalWorkDays; }

    public int getTotalPresentDays() { return totalPresentDays; }
    public void setTotalPresentDays(int totalPresentDays) { this.totalPresentDays = totalPresentDays; }

    public int getTotalLeaveDays() { return totalLeaveDays; }
    public void setTotalLeaveDays(int totalLeaveDays) { this.totalLeaveDays = totalLeaveDays; }

    public int getTotalAbsentDays() { return totalAbsentDays; }
    public void setTotalAbsentDays(int totalAbsentDays) { this.totalAbsentDays = totalAbsentDays; }

    public double getTotalSalary() { return totalSalary; }
    public void setTotalSalary(double totalSalary) { this.totalSalary = totalSalary; }
}