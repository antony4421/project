package com.hrms.controller;
import java.util.List;

import com.hrms.entity.Payslip;
import com.hrms.service.PayslipService;
import com.hrms.repository.PayslipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.Optional;

@RestController
@RequestMapping("/api/payslip")
public class PayslipController {

    @Autowired
    private PayslipService payslipService;

    @Autowired
    private PayslipRepository payslipRepository; // ✅ Injected correctly

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<Payslip> generatePayslip(@PathVariable Long employeeId, @RequestParam int year, @RequestParam int month) {
        YearMonth monthYear = YearMonth.of(year, month);
        Payslip payslip = payslipService.generatePayslip(employeeId, monthYear);
        return ResponseEntity.ok(payslip);
    }

    @GetMapping("/last/{employeeId}")
    public ResponseEntity<Payslip> getLastPayslip(@PathVariable Long employeeId) {
        return payslipService.getLastMonthPayslip(employeeId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Payslip>> getAllPayslips() {
        List<Payslip> payslips = payslipService.getAllPayslips();
        return ResponseEntity.ok(payslips);
    }
  
    @GetMapping("/{employeeId}/{monthYear}")
    public ResponseEntity<Payslip> getPayslipByMonth(
            @PathVariable Long employeeId,
            @PathVariable String monthYear) {

        try {
            // ✅ Convert String to YearMonth
            YearMonth ym = YearMonth.parse(monthYear);

            Optional<Payslip> payslip = payslipRepository.findByEmployeeIdAndMonthYear(employeeId, ym);

            return payslip.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // Handles invalid input format
        }
    }
}