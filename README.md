# Personal Finance Manager

A personal finance application with a React/Vite frontend and a Spring Boot backend backed by PostgreSQL.

New to the codebase? Start with the [simple project and interview guide](./PROJECT-GUIDE.md).

## Project Structure

```text
Personal-Finance-Manager/
|-- backend/       Spring Boot REST API and Maven project
|-- frontend/      React/Vite web application and npm project
|-- .gitignore     Repository-wide Git ignore rules
`-- README.md      Project setup and usage guide
```

## Requirements

Install these tools before running the project:

- Java 17 or newer
- Maven 3.9 or newer (or use the Maven Wrapper included in `backend/`)
- Node.js 20 or newer
- npm 10 or newer
- PostgreSQL 14 or newer
- Git

The dependency manifests are kept with each application:

- Frontend dependencies: `frontend/package.json`
- Backend dependencies: `backend/pom.xml`

There is no `requirements.txt` because this project does not use Python.

## Database Setup

1. Start PostgreSQL.
2. Create a database named `personal_finance`.

Using `psql`:

```sql
CREATE DATABASE personal_finance;
```

The current backend defaults are configured in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/personal_finance
spring.datasource.username=postgres
spring.datasource.password=password
```

Change the username, password, host, port, or database name if your PostgreSQL installation uses different values. Hibernate is configured with `ddl-auto=update`, so the required tables are created or updated when the backend starts.

## Run the Backend

Open PowerShell in the repository root:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The API starts at:

```text
http://localhost:8080
```

To build and test the backend:

```powershell
cd backend
.\mvnw.cmd clean test
.\mvnw.cmd clean package
```

## Run the Frontend

Open a second PowerShell window in the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

The frontend sends API requests to `http://localhost:8080/api`. Start the backend before using dashboard, expense, income, or investment features.

## Accounts and Authentication

- Visit `/register` to create an account. Passwords must be at least 12 characters.
- Sign in at `/login`; the dashboard and finance pages require an authenticated session.
- The backend stores BCrypt password hashes and uses server-side sessions in HttpOnly cookies. Mutating API requests also use CSRF protection.
- Each newly created income, expense, and investment record belongs to the signed-in account. Accounts cannot read or change another account's records.
- Existing records created before authentication have no owner. They remain unassigned and are not displayed to newly registered accounts.

For production, serve the frontend and backend over HTTPS, set `SESSION_COOKIE_SECURE=true`, and set `APP_CORS_ALLOWED_ORIGINS` to the exact frontend origin or comma-separated allowed origins. Do not use wildcard origins with credentialed requests.

To check and build the frontend:

```powershell
cd frontend
npm run lint
npm run build
```

## GitHub Setup

From the repository root:

```powershell
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your GitHub repository URL. The repository `.gitignore` excludes dependencies, build output, IDE files, and environment files.

## Troubleshooting

- **Database connection failed:** Confirm PostgreSQL is running, the `personal_finance` database exists, and the credentials in `application.properties` are correct.
- **Frontend API errors:** Confirm the backend is running on port `8080`.
- **Port already in use:** Stop the process using the port or change the relevant application configuration.
- **Maven command not found:** Use `backend\\mvnw.cmd` on Windows instead of a globally installed Maven command.
