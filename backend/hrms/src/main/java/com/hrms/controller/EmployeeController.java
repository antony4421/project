package com.hrms.controller;
import com.hrms.entity.LeaveRequest; 
 // Import the LeaveRequest entity
import com.hrms.service.LeaveRequestService;
import com.hrms.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import com.hrms.entity.Employee;
import com.hrms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private LeaveRequestService leaveRequestService; // Inject the LeaveRequestService

    @Autowired
    private EmployeeRepository employeeRepository;
    
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Hash password before saving a new employee
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        String hashedPassword = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(hashedPassword); // Store hashed password
        return employeeService.addEmployee(employee);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();
            
            // Update fields only if the new values are not null
            if (updatedEmployee.getAddress() != null) {
                existingEmployee.setAddress(updatedEmployee.getAddress());
            }
            if (updatedEmployee.getPosition() != null) {
                existingEmployee.setPosition(updatedEmployee.getPosition());
            }
            if (updatedEmployee.getSalary() != 0) { // Assuming salary is a double, 0 is a reasonable check
                existingEmployee.setSalary(updatedEmployee.getSalary());
            }

            Employee savedEmployee = employeeRepository.save(existingEmployee);
            return ResponseEntity.ok(savedEmployee);
        }

        return ResponseEntity.notFound().build(); // Returns 404 if employee is not found
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully.");
    }
    @GetMapping("/{employeeId}")
    public Employee getEmployeeById(@PathVariable Long employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    
    }
}