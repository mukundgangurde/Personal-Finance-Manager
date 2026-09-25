package com.projects.service;

import com.projects.dto.DashboardSummary;
import com.projects.entity.Expense;
import com.projects.entity.Income;
import com.projects.entity.Investment;
import com.projects.repository.ExpenseRepository;
import com.projects.repository.IncomeRepository;
import com.projects.repository.InvestmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final InvestmentRepository investmentRepository;

    public DashboardService(
            ExpenseRepository expenseRepository,
            IncomeRepository incomeRepository,
            InvestmentRepository investmentRepository) {

        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.investmentRepository = investmentRepository;
    }

    public DashboardSummary getSummary() {

        List<Expense> expenses = expenseRepository.findAll();
        List<Income> incomes = incomeRepository.findAll();
        List<Investment> investments = investmentRepository.findAll();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalInvested = investments.stream()
                .mapToDouble(Investment::getAmountInvested)
                .sum();

        double currentInvestmentValue = investments.stream()
                .mapToDouble(Investment::getCurrentValue)
                .sum();

        double balance = totalIncome - totalExpense;

        double investmentProfit =
                currentInvestmentValue - totalInvested;

        return new DashboardSummary(
                totalIncome,
                totalExpense,
                totalInvested,
                currentInvestmentValue,
                balance,
                investmentProfit
        );
    }
}