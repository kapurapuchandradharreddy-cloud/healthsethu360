# HealthSethu360 — Local Setup & Development Guide

## Prerequisites
- **Java**: JDK 17+ (e.g. OpenJDK / Eclipse Adoptium Temurin 17)
- **Maven**: 3.8+
- **Node.js**: 18+ (Node 25.x supported) & npm 10+
- **MySQL**: Community Server 8.0+ running on port 3306

---

## 1. Database Setup
1. Ensure MySQL Server is running locally.
2. Run the initialization script:
   ```powershell
   # From project root
   & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p'Srikrishna@3' < database/schema.sql
   ```

---

## 2. Backend Setup & Run
1. Navigate to the backend directory:
   ```powershell
   cd d:\HealthSethu360\backend
   ```
2. Build and run unit tests:
   ```powershell
   mvn clean test
   ```
3. Start Spring Boot:
   ```powershell
   mvn spring-boot:run
   ```
   Or override database credentials dynamically if needed:
   ```powershell
   mvn spring-boot:run -Dspring-boot.run.arguments="--DB_PASSWORD=Srikrishna@3"
   ```
4. Verify backend health endpoint:
   ```powershell
   Invoke-RestMethod -Uri http://localhost:8080/api/v1/system/status
   ```

---

## 3. Frontend Setup & Run
1. Navigate to the frontend directory:
   ```powershell
   cd d:\HealthSethu360\frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Run the development server:
   ```powershell
   npm run dev
   ```
4. Access the application in your browser:
   ```
   http://localhost:5173
   ```
