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
  Clock,
  Search,
  ChevronDown,
  UserCheck,
  Bed,
  Users,
  Calendar,
  Pill,
  FileText,
  Bell,
  ArrowUpRight,
  MapPin,
  TrendingUp,
  HeartPulse
} from 'lucide-react';
import { getSystemStatus } from './api/client';

export default function App() {
  const [systemData, setSystemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('All Branches (Multi-Branch Overview)');

  const branches = [
    'All Branches (Multi-Branch Overview)',
    'Indraprastha Central Hospital (Main Campus)',
    'City Care Specialty Center (South Wing)',
    'Metro Health Diagnostics & Day Clinic'
  ];

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
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const dbConnected = systemData?.database?.connected;

  return (
    <div className="app-container">
      {/* ============================================================
          TOP NAVIGATION BAR
          ============================================================ */}
      <header className="top-navbar">
        <div className="nav-left">
          {/* Brand Identity */}
          <div className="brand-wrapper">
            <div className="brand-icon-box">
              <Activity size={26} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <div>
              <div className="brand-title">
                HealthSethu<span>360</span>
              </div>
              <div className="brand-tagline">
                Connected Care. Smarter Hospitals. Healthier Lives.
              </div>
            </div>
          </div>

          {/* Hospital Branch Switcher */}
          <div className="branch-selector" title="Switch Active Hospital Branch">
            <Building2 size={16} color="#5EEAD4" />
            <span>{selectedBranch}</span>
            <ChevronDown size={14} color="#94A3B8" />
          </div>

          {/* Quick Search */}
          <div className="nav-search">
            <Search size={16} color="#94A3B8" />
            <input 
              type="text" 
              placeholder="Search patients by MRN, doctors, beds..." 
              readOnly 
              onClick={() => alert("Global search will activate in Phase 4 (Patient & Core Management)")}
            />
          </div>
        </div>

        <div className="nav-right">
          {/* Live Status Pill */}
          {loading && !systemData ? (
            <span className="badge badge-warning">
              <RefreshCw size={14} className="animate-spin" /> Connecting Engine...
            </span>
          ) : error ? (
            <span className="badge badge-critical">
              <span className="status-dot inactive"></span> Backend Offline
            </span>
          ) : dbConnected ? (
            <span className="badge badge-success">
              <span className="status-dot active"></span> MySQL 8.0 Live &amp; Healthy
            </span>
          ) : (
            <span className="badge badge-warning">
              <AlertCircle size={14} /> Reconnecting DB...
            </span>
          )}

          {/* Refresh Action */}
          <button 
            className="btn btn-secondary" 
            onClick={fetchStatus} 
            disabled={loading}
            title="Refresh System Diagnostics"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>

          {/* Staff User Profile */}
          <div className="staff-profile">
            <div className="staff-avatar">
              VS
            </div>
            <div className="staff-info">
              <span className="staff-name">Dr. Vikram Sethu</span>
              <span className="staff-role">Chief Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN DASHBOARD VIEWPORT
          ============================================================ */}
      <main className="main-wrapper">
        {/* HERO SHOWCASE BANNER WITH MODERN HOSPITAL VISUAL */}
        <div className="hero-banner">
          <div className="hero-inner">
            <div>
              <div className="hero-tag">
                <HeartPulse size={14} />
                <span>Enterprise Multi-Branch Healthcare Platform</span>
              </div>
              <h1 className="hero-title">
                Connected Care. <span>Smarter Hospitals.</span> Healthier Lives.
              </h1>
              <p className="hero-desc">
                Centralized hospital intelligence synchronizing clinical encounters, live queue telemetry, 
                bed allocations, and pharmacy inventories across all branches with enterprise-grade Java 17 security.
              </p>

              {/* Quick High-Level Metrics */}
              <div className="hero-quick-stats">
                <div className="hero-stat-box">
                  <div className="hero-stat-value">1,240</div>
                  <div className="hero-stat-label">Total Beds Across Branches</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-value">48</div>
                  <div className="hero-stat-label">Doctors Active Today</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-value">
                    {systemData?.database?.pingLatencyMs ? `${systemData.database.pingLatencyMs}ms` : '1ms'}
                  </div>
                  <div className="hero-stat-label">DB Cluster Latency</div>
                </div>
              </div>
            </div>

            {/* Generated Photorealistic Hospital Asset */}
            <div className="hero-media-card">
              <img 
                src="/images/hospital_hero.jpg" 
                alt="HealthSethu360 Hospital Lobby" 
                className="hero-img"
              />
              <div className="hero-img-badge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Building2 size={18} color="#5EEAD4" />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
                      Lumina Central Medical Hub
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      Primary Campus • Branch Code: IND-01
                    </div>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  <span className="status-dot active"></span> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MULTI-BRANCH NETWORK OVERVIEW CARDS
            ============================================================ */}
        <div className="section-header">
          <div>
            <div className="section-title">
              <Building2 size={22} color="var(--color-navy)" />
              Multi-Branch Hospital Network Status
            </div>
            <div className="section-subtitle">
              Live operational monitoring synchronized across all registered medical branches.
            </div>
          </div>
          <span className="badge badge-teal">3 Branches Connected</span>
        </div>

        <div className="branches-grid">
          {/* Branch 1 */}
          <div className="branch-card">
            <div className="branch-card-header">
              <div>
                <div className="branch-name">Indraprastha Central Hospital</div>
                <div className="branch-location">
                  <MapPin size={12} color="var(--color-teal)" />
                  Campus A • Multi-Specialty &amp; Emergency Hub
                </div>
              </div>
              <span className="badge badge-success">Online</span>
            </div>

            <div className="branch-stats">
              <div className="branch-stat-item">
                <div className="branch-stat-val">520</div>
                <div className="branch-stat-lbl">Total Beds</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-warning)' }}>94%</div>
                <div className="branch-stat-lbl">Occupancy</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-teal)' }}>14</div>
                <div className="branch-stat-lbl">Queue Tokens</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span>ICU &amp; Trauma: <strong>Full Readiness</strong></span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                View Branch <ArrowUpRight size={14} />
              </span>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="branch-card">
            <div className="branch-card-header">
              <div>
                <div className="branch-name">City Care Specialty Center</div>
                <div className="branch-location">
                  <MapPin size={12} color="var(--color-teal)" />
                  South Campus • Cardiology, Orthopedics &amp; Neurology
                </div>
              </div>
              <span className="badge badge-success">Online</span>
            </div>

            <div className="branch-stats">
              <div className="branch-stat-item">
                <div className="branch-stat-val">420</div>
                <div className="branch-stat-lbl">Total Beds</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-success)' }}>76%</div>
                <div className="branch-stat-lbl">Occupancy</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-teal)' }}>22</div>
                <div className="branch-stat-lbl">Queue Tokens</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span>OPD Consultations: <strong>Active</strong></span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                View Branch <ArrowUpRight size={14} />
              </span>
            </div>
          </div>

          {/* Branch 3 */}
          <div className="branch-card">
            <div className="branch-card-header">
              <div>
                <div className="branch-name">Metro Health Diagnostics</div>
                <div className="branch-location">
                  <MapPin size={12} color="var(--color-teal)" />
                  West Wing • Pathology, Radiology &amp; Day Care
                </div>
              </div>
              <span className="badge badge-success">Online</span>
            </div>

            <div className="branch-stats">
              <div className="branch-stat-item">
                <div className="branch-stat-val">300</div>
                <div className="branch-stat-lbl">Total Beds</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-success)' }}>68%</div>
                <div className="branch-stat-lbl">Occupancy</div>
              </div>
              <div className="branch-stat-item">
                <div className="branch-stat-val" style={{ color: 'var(--color-teal)' }}>8</div>
                <div className="branch-stat-lbl">Queue Tokens</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span>Diagnostic Scans: <strong>Online</strong></span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                View Branch <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================
            SPLIT SHOWCASE: TELEMETRY ENGINE & CLINICAL TEAM
            ============================================================ */}
        <div className="showcase-grid">
          {/* Left: Backend Engine & MySQL Diagnostics */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Server size={20} color="var(--color-primary)" />
                Core Backend &amp; Database Diagnostics
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-teal">
                  <Clock size={12} /> Uptime: {systemData?.uptimeSeconds || 0}s
                </span>
              </div>
            </div>

            {error ? (
              <div style={{ background: '#FFF1F2', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#991B1B', fontSize: '0.875rem' }}>
                <strong>Connection Error:</strong> {error}
              </div>
            ) : systemData ? (
              <div>
                <div className="details-grid" style={{ marginBottom: '1.25rem' }}>
                  {/* Database Info */}
                  <div className="detail-item">
                    <div className="detail-label">
                      <Database size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Database Cluster
                    </div>
                    <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {systemData.database?.databaseProduct}
                      <CheckCircle2 size={16} color="var(--color-success)" />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                      Version: <strong>{systemData.database?.databaseVersion}</strong> • Schema: <code>{systemData.database?.currentDatabase}</code>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-teal)', fontWeight: 700, marginTop: '0.25rem' }}>
                      Query Latency: {systemData.database?.pingLatencyMs} ms
                    </div>
                  </div>

                  {/* Java Runtime */}
                  <div className="detail-item">
                    <div className="detail-label">
                      <Server size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Java Engine
                    </div>
                    <div className="detail-value">
                      Java {systemData.runtime?.javaVersion}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                      {systemData.runtime?.javaVendor} • Spring Boot 3.3.5
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                      OS: {systemData.runtime?.osName}
                    </div>
                  </div>

                  {/* Compute */}
                  <div className="detail-item">
                    <div className="detail-label">
                      <Cpu size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Compute &amp; Cores
                    </div>
                    <div className="detail-value">
                      {systemData.runtime?.availableProcessors} Dedicated CPU Cores
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                      Heap: {systemData.runtime?.totalMemoryMb - systemData.runtime?.freeMemoryMb} MB / {systemData.runtime?.totalMemoryMb} MB
                    </div>
                  </div>

                  {/* Milestone */}
                  <div className="detail-item">
                    <div className="detail-label">
                      <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Foundation Status
                    </div>
                    <div className="detail-value" style={{ color: 'var(--color-teal)' }}>
                      Phase 1 Verified
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                      Build: {systemData.appVersion} ({systemData.environment})
                    </div>
                  </div>
                </div>

                {/* Seeded Metadata Pills */}
                {systemData.database?.metadata && (
                  <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Verified Database Metadata (<code>system_metadata</code>)
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {Object.entries(systemData.database.metadata).map(([key, val]) => (
                        <span key={key} style={{ background: '#FFFFFF', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', border: '1px solid var(--color-border-subtle)' }}>
                          <strong style={{ color: 'var(--color-text-secondary)' }}>{key}:</strong> {val}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Right: Medical Team Showcase & Clinical Launchpad */}
          <div className="team-banner">
            <div className="team-img-wrap">
              <img 
                src="/images/medical_team.jpg" 
                alt="HealthSethu360 Clinical Doctors & Specialists" 
                className="team-img"
              />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', background: 'rgba(10, 25, 47, 0.85)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700 }}>
                Certified Clinical Doctors &amp; Specialist Network
              </div>
            </div>

            <div className="team-content">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--color-navy)', fontSize: '1rem' }}>
                  Core Healthcare Modules
                </span>
                <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>Phase 2-7</span>
              </div>

              {/* Module Launchpad Tiles */}
              <div className="launchpad-grid">
                <div className="launchpad-tile" onClick={() => alert("Patient Registration (MRN) opens in Phase 4")}>
                  <div className="launchpad-icon" style={{ background: '#EFF6FF', color: 'var(--color-primary)' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="launchpad-title">Patients</div>
                    <div className="launchpad-sub">MRN &amp; Profiles</div>
                  </div>
                </div>

                <div className="launchpad-tile" onClick={() => alert("Doctor Appointments open in Phase 4")}>
                  <div className="launchpad-icon" style={{ background: '#F0FDF4', color: 'var(--color-success)' }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="launchpad-title">Schedules</div>
                    <div className="launchpad-sub">Appointments</div>
                  </div>
                </div>

                <div className="launchpad-tile" onClick={() => alert("SmartQueue live updates open in Phase 5")}>
                  <div className="launchpad-icon" style={{ background: '#CCFBF1', color: 'var(--color-teal)' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="launchpad-title">SmartQueue</div>
                    <div className="launchpad-sub">Live Tokens</div>
                  </div>
                </div>

                <div className="launchpad-tile" onClick={() => alert("Bed & Inpatient management opens in Phase 6")}>
                  <div className="launchpad-icon" style={{ background: '#FEF3C7', color: 'var(--color-warning)' }}>
                    <Bed size={20} />
                  </div>
                  <div>
                    <div className="launchpad-title">Beds &amp; Wards</div>
                    <div className="launchpad-sub">Admissions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            IMPLEMENTATION STRATEGY ROADMAP
            ============================================================ */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={20} color="var(--color-navy)" />
              Platform Roadmap — 8 Phase Delivery Milestones
            </div>
            <span className="badge badge-success">
              <CheckCircle2 size={14} /> Phase 1 Foundation Verified
            </span>
          </div>

          <div className="roadmap-grid">
            <div className="roadmap-card current">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-teal)' }}>PHASE 1</span>
                <span className="badge badge-success" style={{ fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>Active &amp; Tested</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Foundation &amp; Architecture
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Spring Boot 3.3.5, Java 17, Spring JDBC, MySQL 8.0, React 18, Vite proxy, and health check API.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 2</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>Next</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                UI Foundation &amp; Navigation
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Collapsible sidebar, top bar with branch switcher, design components, and admin dashboard.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 3</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>Planned</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Authentication &amp; RBAC
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Spring Security 6, JWT with HttpOnly cookies, 9 application roles, branch access switcher.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 4</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>Planned</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Core Operations
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Organizations, branches, departments, patient registration (MRN), doctor schedules, appointments.
              </p>
            </div>

            <div className="roadmap-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-text-muted)' }}>PHASE 5-8</span>
                <span className="badge" style={{ background: '#F1F5F9', color: '#64748B', fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>Planned</span>
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Clinical, Inpatient, Billing &amp; QA
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                SmartQueue, Patient 360°, Emergency triage, Beds/Wards, Pharmacy, Invoices, Docker &amp; Tests.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
