package com.projects.controller;

import com.projects.entity.Investment;
import com.projects.service.InvestmentService;
import com.projects.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/investments")
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @PostMapping
    public Investment addInvestment(@RequestBody Investment investment, @AuthenticationPrincipal User user) {
        return investmentService.addInvestment(investment, user);
    }


    @GetMapping
    public List<Investment> getAllInvestment(@AuthenticationPrincipal User user) {
        return investmentService.getAllInvestment(user);
    }

    @GetMapping("/{id}")
    public Investment getInvestmentById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return investmentService.getInvestmentById(id, user);
    }

    @PutMapping("/{id}")
    public Investment updateInvestment(
            @PathVariable Long id,
            @RequestBody Investment investment,
            @AuthenticationPrincipal User user) {

        return investmentService.updateInvestment(id, investment, user);
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable Long id, @AuthenticationPrincipal User user) {
        investmentService.deleteInvestment(id, user);
    }
}
