package com.projects.repository;

import com.projects.entity.Income;
import com.projects.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {
}
