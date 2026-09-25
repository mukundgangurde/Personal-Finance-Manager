package com.projects.controller;

import com.projects.entity.Investment;
import com.projects.service.InvestmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/investments")
@CrossOrigin(origins = "*")
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @PostMapping
    public Investment addInvestment(@RequestBody Investment investment) {
        return investmentService.addInvestment(investment);
    }


    @GetMapping
    public List<Investment> getAllInvestment() {
        return investmentService.getAllInvestment();
    }

    @GetMapping("/{id}")
    public Investment getInvestmentById(@PathVariable Long id) {
        return investmentService.getInvestmentById(id);
    }

    @PutMapping("/{id}")
    public Investment updateInvestment(
            @PathVariable Long id,
            @RequestBody Investment investment) {

        return investmentService.updateInvestment(id, investment);
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
    }
}
