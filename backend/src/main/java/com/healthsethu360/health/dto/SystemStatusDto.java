package com.healthsethu360.health.dto;

import java.time.Instant;
import java.util.Map;

public class SystemStatusDto {

    private String appName;
    private String appVersion;
    private String currentPhase;
    private String environment;
    private long uptimeSeconds;
    private Instant serverTime;

    private DatabaseStatus database;
    private RuntimeInfo runtime;

    public static class DatabaseStatus {
        private boolean connected;
        private String databaseProduct;
        private String databaseVersion;
        private String currentDatabase;
        private long pingLatencyMs;
        private Map<String, String> metadata;

        public boolean isConnected() {
            return connected;
        }

        public void setConnected(boolean connected) {
            this.connected = connected;
        }

        public String getDatabaseProduct() {
            return databaseProduct;
        }

        public void setDatabaseProduct(String databaseProduct) {
            this.databaseProduct = databaseProduct;
        }

        public String getDatabaseVersion() {
            return databaseVersion;
        }

        public void setDatabaseVersion(String databaseVersion) {
            this.databaseVersion = databaseVersion;
        }

        public String getCurrentDatabase() {
            return currentDatabase;
        }

        public void setCurrentDatabase(String currentDatabase) {
            this.currentDatabase = currentDatabase;
        }

        public long getPingLatencyMs() {
            return pingLatencyMs;
        }

        public void setPingLatencyMs(long pingLatencyMs) {
            this.pingLatencyMs = pingLatencyMs;
        }

        public Map<String, String> getMetadata() {
            return metadata;
        }

        public void setMetadata(Map<String, String> metadata) {
            this.metadata = metadata;
        }
    }

    public static class RuntimeInfo {
        private String javaVersion;
        private String javaVendor;
        private String osName;
        private int availableProcessors;
        private long freeMemoryMb;
        private long totalMemoryMb;
        private long maxMemoryMb;

        public String getJavaVersion() {
            return javaVersion;
        }

        public void setJavaVersion(String javaVersion) {
            this.javaVersion = javaVersion;
        }

        public String getJavaVendor() {
            return javaVendor;
        }

        public void setJavaVendor(String javaVendor) {
            this.javaVendor = javaVendor;
        }

        public String getOsName() {
            return osName;
        }

        public void setOsName(String osName) {
            this.osName = osName;
        }

        public int getAvailableProcessors() {
            return availableProcessors;
        }

        public void setAvailableProcessors(int availableProcessors) {
            this.availableProcessors = availableProcessors;
        }

        public long getFreeMemoryMb() {
            return freeMemoryMb;
        }

        public void setFreeMemoryMb(long freeMemoryMb) {
            this.freeMemoryMb = freeMemoryMb;
        }

        public long getTotalMemoryMb() {
            return totalMemoryMb;
        }

        public void setTotalMemoryMb(long totalMemoryMb) {
            this.totalMemoryMb = totalMemoryMb;
        }

        public long getMaxMemoryMb() {
            return maxMemoryMb;
        }

        public void setMaxMemoryMb(long maxMemoryMb) {
            this.maxMemoryMb = maxMemoryMb;
        }
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    public String getCurrentPhase() {
        return currentPhase;
    }

    public void setCurrentPhase(String currentPhase) {
        this.currentPhase = currentPhase;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public long getUptimeSeconds() {
        return uptimeSeconds;
    }

    public void setUptimeSeconds(long uptimeSeconds) {
        this.uptimeSeconds = uptimeSeconds;
    }

    public Instant getServerTime() {
        return serverTime;
    }

    public void setServerTime(Instant serverTime) {
        this.serverTime = serverTime;
    }

    public DatabaseStatus getDatabase() {
        return database;
    }

    public void setDatabase(DatabaseStatus database) {
        this.database = database;
    }

    public RuntimeInfo getRuntime() {
        return runtime;
    }

    public void setRuntime(RuntimeInfo runtime) {
        this.runtime = runtime;
    }
}
