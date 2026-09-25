package com.projects.service;

import com.projects.entity.Investment;
import com.projects.repository.InvestmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {

    private final InvestmentRepository investmentRepository;

    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }

    public Investment addInvestment(Investment investment) {
        return investmentRepository.save(investment);
    }

    public List<Investment> getAllInvestment() {
        return investmentRepository.findAll();
    }

    public Investment getInvestmentById(Long id) {
        return investmentRepository.findById(id).orElse(null);
    }

    public Investment updateInvestment(Long id, Investment updatedInvestment) {

        Investment existingInvestment =
                investmentRepository.findById(id).orElse(null);

        if (existingInvestment == null) {
            return null;
        }

        existingInvestment.setType(updatedInvestment.getType());
        existingInvestment.setName(updatedInvestment.getName());
        existingInvestment.setAmountInvested(updatedInvestment.getAmountInvested());
        existingInvestment.setCurrentValue(updatedInvestment.getCurrentValue());
        existingInvestment.setInvestmentDate(updatedInvestment.getInvestmentDate());
        existingInvestment.setMaturityDate(updatedInvestment.getMaturityDate());
        existingInvestment.setStatus(updatedInvestment.getStatus());
        existingInvestment.setDescription(updatedInvestment.getDescription());

        return investmentRepository.save(existingInvestment);
    }

    public void deleteInvestment(Long id) {
        investmentRepository.deleteById(id);
    }
}