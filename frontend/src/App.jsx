import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Server, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  Building2, 
  ShieldCheck,
  Stethoscope,
  Clock
} from 'lucide-react';
import { getSystemStatus } from './api/client';

export default function App() {
  const [systemData, setSystemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getSystemStatus();
      if (res && res.success) {
        setSystemData(res.data);
      } else {
        setError(res?.message || 'Unexpected response format from backend');
      }
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to connect to backend:', err);
      setError(err.message || 'Could not connect to Spring Boot API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every 10 seconds for real-time connection status
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const dbConnected = systemData?.database?.connected;

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="brand-wrapper">
          <div className="brand-logo">
            <Activity size={24} color="#0D9488" />
          </div>
          <div>
            <div className="brand-title">
              HealthSethu<span>360</span>
            </div>
            <div className="brand-subtitle">
              Connected Care. Smarter Hospitals. Healthier Lives.
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {loading && !systemData ? (
            <span className="badge badge-warning">
              <RefreshCw size={14} className="animate-spin" /> Connecting...
            </span>
          ) : error ? (
            <span className="badge badge-critical">
              <span className="status-dot inactive"></span> Backend Offline
            </span>
          ) : dbConnected ? (
            <span className="badge badge-success">
              <span className="status-dot active"></span> Live & Healthy
            </span>
          ) : (
            <span className="badge badge-warning">
              <AlertCircle size={14} /> DB Connecting
            </span>
          )}

          <button 
            className="btn btn-secondary" 
            onClick={fetchStatus} 
            disabled={loading}
            title="Refresh System Diagnostics"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Banner */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.85rem', marginBottom: '0.4rem' }}>
            System Architecture & Live Health Monitor
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Phase 1 Foundation: Verifying Spring Boot 3.3 REST API, Spring JDBC, and MySQL 8.0 connectivity.
          </p>
        </div>

        {/* Connection Diagnostics Section */}
        {error ? (
          <div className="card" style={{ borderColor: 'var(--color-critical)' }}>
            <div className="card-header">
              <div className="card-title" style={{ color: 'var(--color-critical)' }}>
                <AlertCircle size={20} /> Backend Connection Unreachable
              </div>
              <span className="badge badge-critical">Action Required</span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              The frontend is operational, but could not reach the Spring Boot backend at <code>http://localhost:8080/api/v1/system/status</code>.
            </p>
            <div style={{ background: '#FFF1F2', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#991B1B', fontSize: '0.875rem' }}>
              <strong>Error Details:</strong> {error}
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <strong>Troubleshooting steps:</strong>
              <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: '1.7' }}>
                <li>Confirm MySQL Server 8.0 is running on port 3306.</li>
                <li>In another terminal, run <code>cd d:\HealthSethu360\backend &amp;&amp; mvn spring-boot:run</code>.</li>
                <li>Click the <strong>Refresh</strong> button in the navigation header above.</li>
              </ol>
            </div>
          </div>
        ) : systemData ? (
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Server size={20} color="var(--color-primary)" />
                Core Infrastructure & Database Status
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span className="badge badge-teal">
                  <Clock size={14} /> Uptime: {systemData.uptimeSeconds}s
                </span>
                <span className="badge badge-info">
                  Refreshed: {lastRefreshed}
                </span>
              </div>
            </div>

            <div className="details-grid">
              {/* Database Card */}
              <div className="detail-item">
                <div className="detail-label">
                  <Database size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Database Engine
                </div>
                <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {systemData.database?.databaseProduct}
                  {dbConnected && <CheckCircle2 size={16} color="var(--color-success)" />}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Version: <strong>{systemData.database?.databaseVersion}</strong> | DB: <strong>{systemData.database?.currentDatabase}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-teal)', marginTop: '0.25rem' }}>
                  Ping Latency: <strong>{systemData.database?.pingLatencyMs} ms</strong>
                </div>
              </div>

              {/* Backend Runtime Card */}
              <div className="detail-item">
                <div className="detail-label">
                  <Server size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Backend Runtime
                </div>
                <div className="detail-value">
                  Java {systemData.runtime?.javaVersion}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Vendor: <strong>{systemData.runtime?.javaVendor}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  OS: {systemData.runtime?.osName}
                </div>
              </div>

              {/* Memory Diagnostics */}
              <div className="detail-item">
                <div className="detail-label">
                  <Cpu size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  JVM Memory & Compute
                </div>
                <div className="detail-value">
                  {systemData.runtime?.totalMemoryMb - systemData.runtime?.freeMemoryMb} MB / {systemData.runtime?.totalMemoryMb} MB
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Max Allocatable: <strong>{systemData.runtime?.maxMemoryMb} MB</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Available CPU Cores: <strong>{systemData.runtime?.availableProcessors}</strong>
                </div>
              </div>

              {/* Application Milestone */}
              <div className="detail-item">
                <div className="detail-label">
                  <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Application Stage
                </div>
                <div className="detail-value" style={{ color: 'var(--color-teal)' }}>
                  {systemData.currentPhase}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Build: <strong>{systemData.appVersion}</strong> ({systemData.environment})
                </div>
              </div>
            </div>

            {/* Seeded Metadata Verification */}
            {systemData.database?.metadata && (
              <div style={{ marginTop: '1.5rem', background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Verified Database Seed Entries (<code>system_metadata</code>)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {Object.entries(systemData.database.metadata).map(([key, val]) => (
                    <span key={key} style={{ background: 'var(--color-bg)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px solid var(--color-border-subtle)' }}>
                      <strong style={{ color: 'var(--color-text-secondary)' }}>{key}:</strong> {val}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Phase Roadmap Section */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={20} color="var(--color-navy)" />
              Implementation Strategy Roadmap
            </div>
            <span className="badge badge-teal">Phase 1 Active</span>
          </div>

          <div className="roadmap-grid">
            <div className="roadmap-card current">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-teal)' }}>PHASE 1</span>
                <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Active</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                Foundation & Architecture
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Spring Boot 3.x, Java 17, Spring JDBC, MySQL 8.0, React 18, Vite proxy, and health check API.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 2</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Pending</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                UI Foundation & Design System
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Sidebar navigation, header, theme tokens, Lucide icons, responsive dashboard layouts.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 3</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Pending</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                Authentication & RBAC
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Spring Security 6, JWT with HttpOnly cookies, 9 application roles, branch access switcher.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 4</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Pending</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                Core Operations
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Organizations, branches, departments, patient registration (MRN), doctor schedules, appointments.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 5-8</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Planned</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                Clinical, Inpatient, Billing & QA
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                SmartQueue, Patient 360°, Emergency triage, Beds/Wards, Pharmacy, Invoices, Docker & Tests.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
