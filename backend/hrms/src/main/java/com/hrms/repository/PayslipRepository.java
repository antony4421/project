package com.hrms.repository;
import java.util.List;

import com.hrms.entity.Payslip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.YearMonth;
import java.util.Optional;

public interface PayslipRepository extends JpaRepository<Payslip, Long> {
    

    @Query("SELECT p FROM Payslip p WHERE p.employeeId = :employeeId ORDER BY p.monthYear DESC LIMIT 1")
    Optional<Payslip> findLastPayslipByEmployeeId(@Param("employeeId") Long employeeId);
    Optional<Payslip> findByEmployeeIdAndMonthYear(Long employeeId, YearMonth monthYear);
 

}