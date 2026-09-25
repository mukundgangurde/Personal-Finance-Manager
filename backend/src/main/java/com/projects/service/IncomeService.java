package com.projects.service;

import com.projects.entity.Income;
import com.projects.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }

    public Income getIncomeById(Long id) {
        return incomeRepository.findById(id).orElse(null);
    }

    public Income updateIncome(Long id, Income updatedIncome) {

        Income existingIncome =
                incomeRepository.findById(id).orElse(null);

        if (existingIncome == null) {
            return null;
        }

        existingIncome.setAmount(updatedIncome.getAmount());
        existingIncome.setSource(updatedIncome.getSource());
        existingIncome.setDate(updatedIncome.getDate());
        existingIncome.setDescription(updatedIncome.getDescription());

        return incomeRepository.save(existingIncome);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
}