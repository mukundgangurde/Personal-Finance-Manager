package com.projects.repository;

import com.projects.entity.Income;
import com.projects.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findAllByUserId(Long userId);
    java.util.Optional<Investment> findByIdAndUserId(Long id, Long userId);
    long deleteByIdAndUserId(Long id, Long userId);
}
