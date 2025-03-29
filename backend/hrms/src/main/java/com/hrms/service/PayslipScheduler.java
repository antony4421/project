
package com.hrms.service;

import com.hrms.entity.Payslip;
import com.hrms.entity.Employee;
import com.hrms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.YearMonth;
import java.util.List;

@Service
public class PayslipScheduler {

    @Autowired
    private PayslipService payslipService;

    @Autowired
    private EmployeeRepository employeeRepository;

    private static final Logger logger = LoggerFactory.getLogger(PayslipScheduler.class);

    // Runs automatically on the 1st day of every month at 12:00 AM
    @Scheduled(cron = "0 0 0 1 * ?")
    public void generateMonthlyPayslips() {
        YearMonth lastMonth = YearMonth.now().minusMonths(1); // Get last month
        List<Employee> employees = employeeRepository.findAll(); // Get all employees

        logger.info("Starting payslip generation for {}...", lastMonth);

        for (Employee employee : employees) {
            try {
                payslipService.generatePayslip(employee.getId(), lastMonth); // Generate payslip
                logger.info("Payslip generated for Employee ID: {} for {}", employee.getId(), lastMonth);
            } catch (Exception e) {
                logger.error("Failed to generate payslip for Employee ID: {} - {}", employee.getId(), e.getMessage());
            }
        }

        logger.info("Payslip generation for {} completed.", lastMonth);
    }
}