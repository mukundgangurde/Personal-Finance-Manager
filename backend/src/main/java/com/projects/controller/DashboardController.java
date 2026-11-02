package com.projects.controller;

import com.projects.dto.DashboardSummary;
import com.projects.service.DashboardService;
import com.projects.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummary getSummary(@AuthenticationPrincipal User user) {
        return dashboardService.getSummary(user);
    }
}