package com.projects.service;

import com.projects.entity.Investment;
import com.projects.repository.InvestmentRepository;
import com.projects.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InvestmentService {

    private final InvestmentRepository investmentRepository;

    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }

    public Investment addInvestment(Investment investment, User user) {
        investment.setId(null);
        investment.setUser(user);
        return investmentRepository.save(investment);
    }

    public List<Investment> getAllInvestment(User user) {
        return investmentRepository.findAllByUserId(user.getId());
    }

    public Investment getInvestmentById(Long id, User user) {
        return investmentRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Investment updateInvestment(Long id, Investment updatedInvestment, User user) {
        Investment existingInvestment = getInvestmentById(id, user);

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

    public void deleteInvestment(Long id, User user) {
        if (investmentRepository.deleteByIdAndUserId(id, user.getId()) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}