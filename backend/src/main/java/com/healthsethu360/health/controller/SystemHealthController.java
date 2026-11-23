package com.healthsethu360.health.controller;

import com.healthsethu360.common.ApiResponse;
import com.healthsethu360.health.dto.SystemStatusDto;
import com.healthsethu360.health.service.SystemHealthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class SystemHealthController {

    private final SystemHealthService systemHealthService;

    public SystemHealthController(SystemHealthService systemHealthService) {
        this.systemHealthService = systemHealthService;
    }

    /**
     * Lightweight liveness probe endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> health() {
        return ResponseEntity.ok(ApiResponse.success("HealthSethu360 service is UP", Map.of("status", "UP")));
    }

    /**
     * Detailed system readiness and MySQL diagnostics endpoint.
     */
    @GetMapping("/system/status")
    public ResponseEntity<ApiResponse<SystemStatusDto>> getSystemStatus() {
        SystemStatusDto status = systemHealthService.getSystemStatus();
        return ResponseEntity.ok(ApiResponse.success("System status retrieved successfully", status));
    }
}
