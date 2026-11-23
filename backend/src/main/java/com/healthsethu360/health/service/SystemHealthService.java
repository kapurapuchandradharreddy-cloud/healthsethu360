package com.healthsethu360.health.service;

import com.healthsethu360.health.dto.SystemStatusDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.lang.management.ManagementFactory;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class SystemHealthService {

    private static final Logger log = LoggerFactory.getLogger(SystemHealthService.class);

    private final JdbcTemplate jdbcTemplate;

    @Value("${healthsethu.app.name:HealthSethu360}")
    private String appName;

    @Value("${healthsethu.app.version:1.0.0-SNAPSHOT}")
    private String appVersion;

    @Value("${healthsethu.app.phase:Phase 1 — Project Foundation}")
    private String currentPhase;

    public SystemHealthService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public SystemStatusDto getSystemStatus() {
        SystemStatusDto status = new SystemStatusDto();
        status.setAppName(appName);
        status.setAppVersion(appVersion);
        status.setCurrentPhase(currentPhase);
        status.setEnvironment(System.getProperty("spring.profiles.active", "development"));
        status.setServerTime(Instant.now());

        // Uptime from JVM RuntimeMXBean
        long uptimeMs = ManagementFactory.getRuntimeMXBean().getUptime();
        status.setUptimeSeconds(uptimeMs / 1000);

        // Database health via JdbcTemplate
        SystemStatusDto.DatabaseStatus dbStatus = inspectDatabase();
        status.setDatabase(dbStatus);

        // JVM & Host Runtime information
        SystemStatusDto.RuntimeInfo runtimeInfo = inspectRuntime();
        status.setRuntime(runtimeInfo);

        return status;
    }

    private SystemStatusDto.DatabaseStatus inspectDatabase() {
        SystemStatusDto.DatabaseStatus db = new SystemStatusDto.DatabaseStatus();
        long start = System.currentTimeMillis();

        try {
            // Test basic connectivity
            Integer ping = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            long latency = System.currentTimeMillis() - start;
            db.setPingLatencyMs(latency);

            if (ping != null && ping == 1) {
                db.setConnected(true);
                db.setDatabaseProduct("MySQL Community Server");

                String version = jdbcTemplate.queryForObject("SELECT VERSION()", String.class);
                db.setDatabaseVersion(version);

                String currentDb = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
                db.setCurrentDatabase(currentDb);

                // Fetch metadata entries from system_metadata table
                Map<String, String> metaMap = new HashMap<>();
                jdbcTemplate.query("SELECT meta_key, meta_value FROM system_metadata", (rs) -> {
                    metaMap.put(rs.getString("meta_key"), rs.getString("meta_value"));
                });
                db.setMetadata(metaMap);
            } else {
                db.setConnected(false);
            }
        } catch (DataAccessException ex) {
            log.error("Database connection check failed: {}", ex.getMessage());
            db.setConnected(false);
            db.setDatabaseProduct("MySQL (Unreachable / Error)");
            db.setPingLatencyMs(-1);
            db.setMetadata(Map.of("error", ex.getMessage()));
        }

        return db;
    }

    private SystemStatusDto.RuntimeInfo inspectRuntime() {
        SystemStatusDto.RuntimeInfo runtime = new SystemStatusDto.RuntimeInfo();
        Runtime rt = Runtime.getRuntime();

        runtime.setJavaVersion(System.getProperty("java.version"));
        runtime.setJavaVendor(System.getProperty("java.vendor"));
        runtime.setOsName(System.getProperty("os.name") + " (" + System.getProperty("os.arch") + ")");
        runtime.setAvailableProcessors(rt.availableProcessors());

        long mb = 1024 * 1024;
        runtime.setFreeMemoryMb(rt.freeMemory() / mb);
        runtime.setTotalMemoryMb(rt.totalMemory() / mb);
        runtime.setMaxMemoryMb(rt.maxMemory() / mb);

        return runtime;
    }
}
