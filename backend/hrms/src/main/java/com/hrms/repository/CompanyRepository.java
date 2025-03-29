package com.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.hrms.entity.Company;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("SELECT c FROM Company c WHERE c.email = :email AND c.password = :password")
    Optional<Company> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
