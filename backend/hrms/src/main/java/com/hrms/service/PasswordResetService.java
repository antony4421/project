package com.hrms.service;

import com.hrms.entity.Employee;
import com.hrms.entity.PasswordResetToken;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String generateResetToken(String email) {
        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
        if (employeeOpt.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }

        Employee employee = employeeOpt.get();
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmployee(employee);
        resetToken.setExpiryDate(new Date(System.currentTimeMillis() + 1000 * 60 * 15)); // 15 min expiry

        tokenRepository.save(resetToken);
        return token;
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty() || tokenOpt.get().getExpiryDate().before(new Date())) {
            throw new RuntimeException("Invalid or expired token");
        }

        PasswordResetToken resetToken = tokenOpt.get();
        Employee employee = resetToken.getEmployee();
        employee.setPassword(passwordEncoder.encode(newPassword));

        employeeRepository.save(employee);
        tokenRepository.delete(resetToken); // Remove token after successful reset

        return true;
    }
}
