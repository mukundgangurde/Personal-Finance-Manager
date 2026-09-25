package com.projects.dto;

public class DashboardSummary {

    private double totalIncome;
    private double totalExpense;
    private double totalInvested;
    private double currentInvestmentValue;
    private double balance;
    private double investmentProfit;

    public DashboardSummary() {
    }

    public DashboardSummary(
            double totalIncome,
            double totalExpense,
            double totalInvested,
            double currentInvestmentValue,
            double balance,
            double investmentProfit) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.totalInvested = totalInvested;
        this.currentInvestmentValue = currentInvestmentValue;
        this.balance = balance;
        this.investmentProfit = investmentProfit;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public double getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(double totalInvested) {
        this.totalInvested = totalInvested;
    }

    public double getCurrentInvestmentValue() {
        return currentInvestmentValue;
    }

    public void setCurrentInvestmentValue(double currentInvestmentValue) {
        this.currentInvestmentValue = currentInvestmentValue;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getInvestmentProfit() {
        return investmentProfit;
    }

    public void setInvestmentProfit(double investmentProfit) {
        this.investmentProfit = investmentProfit;
    }
}