package com.projects.controller;

import com.projects.entity.Expense;
import com.projects.service.ExpenseService;
import com.projects.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, @AuthenticationPrincipal User user) {
        return expenseService.addExpense(expense, user);
    }


    @GetMapping
    public List<Expense> getAllExpenses(@AuthenticationPrincipal User user) {
        return expenseService.getAllExpenses(user);
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return expenseService.getExpenseById(id, user);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense,
            @AuthenticationPrincipal User user) {

        return expenseService.updateExpense(id, expense, user);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id, @AuthenticationPrincipal User user) {
        expenseService.deleteExpense(id, user);
    }
}
