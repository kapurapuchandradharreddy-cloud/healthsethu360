-- ====================================================================
-- HealthSethu360 — Primary Database Schema
-- Database: healthsethu360_db
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci
-- ====================================================================

CREATE DATABASE IF NOT EXISTS healthsethu360_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE healthsethu360_db;

-- --------------------------------------------------------------------
-- Phase 1 Foundation Table: System Metadata & Connectivity Verification
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS system_metadata (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    meta_key VARCHAR(100) NOT NULL UNIQUE,
    meta_value VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial system metadata for foundation verification
INSERT INTO system_metadata (meta_key, meta_value, description)
VALUES 
    ('app_name', 'HealthSethu360', 'Platform Name'),
    ('app_version', '1.0.0-SNAPSHOT', 'Current deployment build version'),
    ('phase', 'PHASE_1_FOUNDATION', 'Current implementation milestone'),
    ('schema_initialized_at', CURRENT_TIMESTAMP(), 'Initial database setup timestamp')
ON DUPLICATE KEY UPDATE 
    meta_value = VALUES(meta_value),
    updated_at = CURRENT_TIMESTAMP();
