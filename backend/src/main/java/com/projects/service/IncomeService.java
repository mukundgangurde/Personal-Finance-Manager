package com.projects.service;

import com.projects.entity.Income;
import com.projects.repository.IncomeRepository;
import com.projects.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    public Income addIncome(Income income, User user) {
        income.setId(null);
        income.setUser(user);
        return incomeRepository.save(income);
    }

    public List<Income> getAllIncome(User user) {
        return incomeRepository.findAllByUserId(user.getId());
    }

    public Income getIncomeById(Long id, User user) {
        return incomeRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Income updateIncome(Long id, Income updatedIncome, User user) {
        Income existingIncome = getIncomeById(id, user);

        existingIncome.setAmount(updatedIncome.getAmount());
        existingIncome.setSource(updatedIncome.getSource());
        existingIncome.setDate(updatedIncome.getDate());
        existingIncome.setDescription(updatedIncome.getDescription());

        return incomeRepository.save(existingIncome);
    }

    public void deleteIncome(Long id, User user) {
        if (incomeRepository.deleteByIdAndUserId(id, user.getId()) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}