# HealthSethu360 — Architecture Specification

## 1. System Overview
**HealthSethu360** is an enterprise-grade, multi-branch hospital management platform architected as a clean modular monolith with a modern decoupled single-page application (SPA) frontend.

- **Frontend**: React.js SPA (JSX, Vite, React Router, Lucide Icons, Axios).
- **Backend**: Spring Boot 3.3.x on Java 17, Spring MVC RESTful APIs, Spring Security 6.x, Spring JDBC / `JdbcTemplate`.
- **Database**: MySQL 8.0 with normalized schema, foreign keys, constraints, and audit logging.
- **Servlet/JSP Module**: Separate compatible sub-module demonstrating traditional Java EE / Servlet concepts without polluting the modern React SPA.

```
       +-------------------------------------------------------------+
       |                  Client Layer (Browser)                     |
       |  React 18 SPA (Vite) + Lucide Icons + Responsive CSS3       |
       +------------------------------+------------------------------+
                                      | HTTP/REST (JSON)
                                      | & WebSockets
       +------------------------------v------------------------------+
       |                  Spring Boot 3.x Backend                     |
       |                                                             |
       |   +-----------------------------------------------------+   |
       |   | Security & Filter Chain (JWT Auth, RBAC, Rate Limit)|   |
       |   +-----------------------------------------------------+   |
       |   | REST Controllers (/api/v1/...)                      |   |
       |   +-----------------------------------------------------+   |
       |   | Business Service Layer (Transactions, Validations)  |   |
       |   +-----------------------------------------------------+   |
       |   | Data Access Layer (Spring JdbcTemplate / RowMappers)|   |
       |   +-----------------------------------------------------+   |
       +------------------------------+------------------------------+
                                      | JDBC (MySQL Driver 8.0)
       +------------------------------v------------------------------+
       |                MySQL 8.0 Relational Database                |
       |  healthsethu360_db (Normalized, UUID keys, Constraints)     |
       +-------------------------------------------------------------+
```

## 2. Security Boundaries & Tenancy
- **Organization & Branch Isolation**: Every operational entity (patient, appointment, admission, invoice) is explicitly scoped to an `organization_id` and `branch_id`.
- **Backend Validation**: Roles, branch permissions, and patient IDs are strictly verified on the backend. No client-supplied security assertions are trusted.
- **JdbcTemplate Parameterization**: All queries use parameterized SQL to guarantee protection against SQL injection attacks.
- **Password Security**: Passwords hashed with BCrypt (strength 12).
