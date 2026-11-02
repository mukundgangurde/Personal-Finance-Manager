package com.projects.controller;

import com.projects.entity.Income;
import com.projects.service.IncomeService;
import com.projects.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    public Income addIncome(@RequestBody Income income, @AuthenticationPrincipal User user) {
        return incomeService.addIncome(income, user);
    }

    @GetMapping
    public List<Income> getAllIncome(@AuthenticationPrincipal User user) {
        return incomeService.getAllIncome(user);
    }

    @GetMapping("/{id}")
    public Income getIncomeById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return incomeService.getIncomeById(id, user);
    }

    @PutMapping("/{id}")
    public Income updateIncome(
            @PathVariable Long id,
            @RequestBody Income income,
            @AuthenticationPrincipal User user) {

        return incomeService.updateIncome(id, income, user);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id, @AuthenticationPrincipal User user) {
        incomeService.deleteIncome(id, user);
    }
}