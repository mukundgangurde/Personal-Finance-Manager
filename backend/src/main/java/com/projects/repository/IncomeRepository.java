package com.projects.repository;

import com.projects.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findAllByUserId(Long userId);
    java.util.Optional<Income> findByIdAndUserId(Long id, Long userId);
    long deleteByIdAndUserId(Long id, Long userId);
}