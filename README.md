# HealthSethu360 🏥
### Connected Care. Smarter Hospitals. Healthier Lives.

An Enterprise-Grade Multi-Branch Hospital Management & Healthcare Platform.

---

## 1. Project Overview

**HealthSethu360** is a modern, enterprise-oriented, multi-branch Hospital Management System designed to streamline healthcare operations through a unified digital ecosystem. The platform connects hospital administrators, doctors, nurses, receptionists, pharmacists, billing teams, and patients through a centralized healthcare management solution.

The project follows a modular full-stack architecture, separating the React frontend, Spring Boot backend, and MySQL database specifications to support maintainability, scalability, and future enterprise expansion.

### Key Value Propositions

**Centralized Multi-Branch Management:** Manage multiple hospitals, branches, departments, healthcare professionals, and operational activities through a unified platform.

**SmartQueue Management:** Streamline patient waiting queues with token generation, queue tracking, doctor-wise scheduling, and real-time queue updates.

**Patient 360° Health Records:** Provide an integrated patient profile containing medical history, allergies, diagnoses, prescriptions, vital signs, encounters, and medical documents.

**Comprehensive Hospital Operations:** Coordinate appointments, emergency cases, admissions, wards, beds, pharmacy operations, and billing.

**Role-Based Access Control:** Provide dedicated application experiences for SUPER_ADMIN, ORG_ADMIN, BRANCH_ADMIN, DOCTOR, NURSE, RECEPTIONIST, PHARMACIST, BILLING_STAFF, and PATIENT.

**Healthcare Analytics:** Monitor patient visits, appointments, bed occupancy, hospital performance, financial summaries, and operational activities.

**Premium SaaS Experience:** Deliver a modern, responsive healthcare interface with professional dashboards, intuitive navigation, analytical visualizations, and reusable UI components.

### Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Frontend Tooling | Vite, npm |
| Backend | Java 17, Spring Boot 3.x |
| Security | Spring Security |
| Database Access | JDBC, JdbcTemplate |
| Database | MySQL 8.0 |
| Build Tool | Apache Maven |
| Version Control | Git, GitHub |
| Development Environment | VS Code, Google Antigravity |

---

## 2. Monorepo Architecture

HealthSethu360 follows a modular full-stack architecture with independently organized frontend, backend, and database components.

### High-Level Architecture

```text
                  HealthSethu360
                         |
             +-----------+-----------+
             |                       |
       React Frontend           REST API Layer
        (Port 5173)              (Port 8080)
             |                       |
             |                 Spring Boot
             |                       |
             |              Spring Security
             |                       |
             |                  Services
             |                       |
             |               JDBC / JdbcTemplate
             |                       |
             +-----------------------+
                         |
                    MySQL 8.0
                 (Port 3306)
```

### Architectural Components

**Frontend Layer**
- React-based user interface.
- Reusable components and layouts.
- Role-oriented dashboards.
- API communication layer.
- Responsive navigation.
- Charts, tables, forms, and interactive controls.

**Backend Layer**
- Spring Boot REST API.
- Spring MVC controllers.
- Service-layer business logic.
- JDBC-based database access.
- Spring Security configuration.
- Validation and exception handling.

**Database Layer**
- MySQL relational database.
- Normalized healthcare data models.
- Foreign key relationships.
- Indexes and constraints.
- Database schema and sample data scripts.

---

## 3. Monorepo Directory Organization

The following represents the intended repository organization. Adjust individual filenames to match the actual generated project.

```text
HealthSethu360/
│
├── frontend/                           # React + Vite Application
│   ├── public/                         # Public assets and images
│   ├── src/
│   │   ├── assets/                     # Images, icons and resources
│   │   ├── components/                 # Reusable UI components
│   │   ├── pages/                      # Application pages
│   │   ├── layouts/                    # Dashboard and authentication layouts
│   │   ├── services/                   # API communication services
│   │   ├── context/                    # React context providers
│   │   ├── hooks/                      # Custom React hooks
│   │   ├── App.jsx                     # Application root
│   │   └── main.jsx                    # Frontend entry point
│   ├── package.json                    # Frontend dependencies
│   └── vite.config.js                  # Vite configuration
│
├── backend/                            # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/healthsethu360/
│   │   │   │       ├── config/         # Application configuration
│   │   │   │       ├── security/       # Authentication and authorization
│   │   │   │       ├── common/         # Shared utilities
│   │   │   │       ├── controller/     # REST controllers
│   │   │   │       ├── service/        # Business logic
│   │   │   │       ├── repository/     # Database operations
│   │   │   │       ├── dto/            # Request and response objects
│   │   │   │       └── exception/      # Exception handling
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                       # Backend tests
│   └── pom.xml                         # Maven configuration
│
├── database/                           # MySQL Database Module
│   ├── schema.sql                      # Database table definitions
│   ├── sample-data.sql                 # Fictional demonstration data
│   ├── migrations/                     # Versioned database migrations
│   └── README.md                       # Database setup documentation
│
├── jsp-module/                         # Optional JSP / Servlet module
│
├── docs/                               # Project documentation
│   ├── architecture.md
│   ├── database-design.md
│   └── api-documentation.md
│
├── .gitignore                          # Git exclusion rules
├── README.md                           # Main project documentation
└── docker-compose.yml                  # Optional container orchestration
```

---

## 4. Prerequisites

Install the following software before running HealthSethu360.

| Software | Recommended Version |
|---|---|
| Operating System | Windows 10 / 11, Linux, macOS |
| Node.js | 22 LTS recommended |
| npm | Compatible with installed Node.js |
| Java Development Kit | JDK 17 |
| Apache Maven | 3.9+ |
| MySQL Community Server | 8.0+ |
| MySQL Workbench | Latest compatible version |
| Git | Latest stable version |
| Visual Studio Code | Latest stable version |

### Development Environment

The development environment used for this project includes:

- Windows 11
- Eclipse Temurin JDK 17.0.16
- Apache Maven 3.9.16
- Node.js 25.2.1
- npm 11.6.2
- MySQL Community Server 8.0.44
- Git 2.51.1
- Visual Studio Code 1.147.0

---

## 5. Startup & Running Instructions

### Option A: Local Development (Recommended)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/healthsethu360.git
```

Navigate into the project:

```bash
cd healthsethu360
```

#### Step 2: Database Setup

Open MySQL Workbench and connect to your local MySQL server.

Create the application database:

```sql
CREATE DATABASE IF NOT EXISTS healthsethu360_db;
```

Select the database:

```sql
USE healthsethu360_db;
```

Execute the database schema:

```sql
SOURCE database/schema.sql;
```

Load demonstration data if the sample data file exists:

```sql
SOURCE database/sample-data.sql;
```

Alternatively, execute the SQL scripts directly using MySQL Workbench.

**Important:** Use fictional demonstration data only. Never commit real patient records or sensitive healthcare information.

#### Step 3: Configure Backend Database Connection

Navigate to the backend directory:

```bash
cd backend
```

Configure the MySQL connection through environment variables.

Windows PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/healthsethu360_db"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

Linux / macOS:

```bash
export DB_URL="jdbc:mysql://localhost:3306/healthsethu360_db"
export DB_USERNAME="root"
export DB_PASSWORD="your_mysql_password"
```

Ensure these environment variable names match the placeholders configured in your actual `application.properties`.

Do not commit database credentials to GitHub.

#### Step 4: Launch Spring Boot Backend

From the backend directory, run:

```bash
mvn clean install
```

Start the application:

```bash
mvn spring-boot:run
```

The backend should start at:

```text
http://localhost:8080
```

Check the application health endpoint if implemented:

```text
http://localhost:8080/api/v1/health
```

Use the actual health endpoint configured in your application.

#### Step 5: Launch React Frontend

Open another terminal.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

The HealthSethu360 frontend should now be available locally.

---

### Option B: Docker Deployment (If Configured)

If Dockerfile and Docker Compose configurations are included in the repository, configure the required environment variables in the root `.env` file.

Example:

```env
DB_NAME=healthsethu360_db
DB_USERNAME=root
DB_PASSWORD=your_secure_password
```

Start the configured services:

```bash
docker compose up --build
```

Stop the services:

```bash
docker compose down
```

Docker deployment requires correctly configured Dockerfiles, service definitions, health checks, and database initialization scripts.

---

## 6. Testing & Verification

HealthSethu360 should be verified across frontend, backend, and database layers.

### Backend Build Verification

Navigate to the backend directory:

```bash
cd backend
```

Execute:

```bash
mvn clean package
```

### Backend Test Execution

```bash
mvn test
```

### Frontend Build Verification

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Execute the production build:

```bash
npm run build
```

### Frontend Development Verification

```bash
npm run dev
```
## 7. API Specification

**Base URL:**

```text
http://localhost:8080/api/v1
```

The following table describes the intended API organization. Confirm each endpoint against the implemented backend controllers.

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/login | Authenticate a user |
| GET | /branches | Retrieve authorized branches |
| POST | /patients | Register a patient |
| GET | /patients | Retrieve patients |
| GET | /patients/{id} | Retrieve patient details |
| POST | /appointments | Create an appointment |
| GET | /appointments | Retrieve appointments |
| POST | /queue/tokens | Generate a queue token |
| POST | /queue/{id}/call | Call a queue token |
| POST | /encounters | Create a clinical encounter |
| POST | /emergency/cases | Register an emergency case |
| GET | /beds/availability | Retrieve bed availability |
| POST | /admissions | Create a patient admission |
| GET | /notifications | Retrieve notifications |
| GET | /analytics/overview | Retrieve dashboard analytics |

### API Design Principles

- RESTful endpoint conventions.
- JSON request and response formats.
- Consistent HTTP status codes.
- Input validation.
- Structured exception handling.
- Authentication and authorization.
- Organization and branch-level access restrictions.
- Parameterized database queries.

---

## 8. Demonstration Screenshots

Official project screenshots and walkthrough documentation can be maintained in:

```text
frontend/docs/screenshots/
```

Suggested screenshot collection:

**Core Application**
- HealthSethu360 landing page.
- Login interface.
- Administrator dashboard.
- Branch management.
- Patient management.
- Appointment management.

**Healthcare Operations**
- SmartQueue dashboard.
- Patient 360° medical profile.
- Emergency management.
- Ward and bed management.
- Pharmacy inventory.
- Billing dashboard.

**Analytics and Responsive Design**
- Hospital analytics dashboard.
- Desktop interface.
- Tablet interface.
- Mobile interface.

Add actual screenshots to the repository to make the GitHub project more attractive and easier to evaluate.

---
**Healthcare Data Protection:** HealthSethu360 is designed with security-conscious handling of healthcare information in mind. Production deployment requires appropriate privacy, security, regulatory, and clinical reviews based on the applicable jurisdiction.

---

## 9. Future Enhancements

Potential future improvements include:

- Advanced real-time notifications.
- WebSocket-powered SmartQueue.
- Patient mobile application.
- Online appointment booking.
- Integration with laboratory information systems.
- Integration with medical imaging systems.
- Advanced financial analytics.
- Automated report generation.
- Cloud deployment.
- Containerized infrastructure.
- Backup and disaster recovery automation.

---

## 10. Project Information

**Project Name:** HealthSethu360

**Category:** Healthcare Technology / Hospital Management System

**Architecture:** Modular Full-Stack Application

**Frontend:** React.js

**Backend:** Java 17 + Spring Boot

**Security:** Spring Security

**Database:** MySQL 8.0

**Database Connectivity:** JDBC / JdbcTemplate

**Build Tool:** Apache Maven

**Development Tools:** VS Code, Google Antigravity

**Version Control:** Git and GitHub

**Project Status:** Development / Academic / Portfolio Project

---

### HealthSethu360

**Connected Care. Smarter Hospitals. Healthier Lives.**

One connected ecosystem. Every hospital. Every patient. Every moment.
