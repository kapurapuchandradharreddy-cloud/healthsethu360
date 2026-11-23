package com.healthsethu360.health;

import com.healthsethu360.health.controller.SystemHealthController;
import com.healthsethu360.health.dto.SystemStatusDto;
import com.healthsethu360.health.service.SystemHealthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SystemHealthController.class)
class SystemHealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SystemHealthService systemHealthService;

    @Test
    @WithMockUser
    void healthEndpointShouldReturnUp() throws Exception {
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("UP"));
    }

    @Test
    @WithMockUser
    void systemStatusEndpointShouldReturnSystemDetails() throws Exception {
        SystemStatusDto mockStatus = new SystemStatusDto();
        mockStatus.setAppName("HealthSethu360");
        mockStatus.setCurrentPhase("Phase 1 — Project Foundation");

        SystemStatusDto.DatabaseStatus dbStatus = new SystemStatusDto.DatabaseStatus();
        dbStatus.setConnected(true);
        dbStatus.setDatabaseProduct("MySQL Community Server");
        dbStatus.setDatabaseVersion("8.0.44");
        dbStatus.setMetadata(Map.of("app_name", "HealthSethu360"));
        mockStatus.setDatabase(dbStatus);

        when(systemHealthService.getSystemStatus()).thenReturn(mockStatus);

        mockMvc.perform(get("/api/v1/system/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.appName").value("HealthSethu360"))
                .andExpect(jsonPath("$.data.database.connected").value(true))
                .andExpect(jsonPath("$.data.database.databaseProduct").value("MySQL Community Server"));
    }
}
