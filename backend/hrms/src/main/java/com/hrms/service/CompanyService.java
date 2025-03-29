package com.hrms.service;

import com.hrms.entity.Company;
import com.hrms.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    
    private final CompanyRepository companyRepository;

    // Constructor-based dependency injection (Recommended)
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
    
    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(Long id, Company companyDetails) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));

        // Updating all fields
        company.setName(companyDetails.getName());
        company.setEmail(companyDetails.getEmail());
        company.setPhoneNumber(companyDetails.getPhoneNumber());
        company.setAddress(companyDetails.getAddress());
        company.setIndustry(companyDetails.getIndustry());
        company.setPassword(companyDetails.getPassword());
        return companyRepository.save(company);
    }

    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        companyRepository.delete(company);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // ✅ Add login method
    public Optional<Company> findCompanyByEmailAndPassword(String email, String password) {
        return companyRepository.findByEmailAndPassword(email, password);
    }
}