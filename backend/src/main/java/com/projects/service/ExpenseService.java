package com.projects.service;

import com.projects.entity.Expense;
import com.projects.repository.ExpenseRepository;
import com.projects.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense, User user) {
        expense.setId(null);
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses(User user) {
        return expenseRepository.findAllByUserId(user.getId());
    }

    public Expense getExpenseById(Long id, User user) {
        return expenseRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Expense updateExpense(Long id, Expense updatedExpense, User user) {
        Expense existingExpense = getExpenseById(id, user);

        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDate(updatedExpense.getDate());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setPaymentMethod(updatedExpense.getPaymentMethod());

        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Long id, User user) {
        if (expenseRepository.deleteByIdAndUserId(id, user.getId()) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
