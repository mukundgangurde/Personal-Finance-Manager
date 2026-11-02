# Personal Finance Manager — Simple Project Guide

This guide explains the project in everyday language and gives you a clear way to describe it in an interview.

## 1. What does the project do?

Personal Finance Manager is a website for keeping track of personal:

- Income
- Expenses
- Investments
- A financial summary, including balance and investment profit or loss

Users create an account and sign in before opening their finance pages. Each user's finance records are kept separate from other users' records.

## 2. How the parts fit together

```text
Your browser
    ↓
React frontend — shows pages and collects your input
    ↓ HTTP requests with JSON
Spring Boot backend — checks requests and applies rules
    ↓
PostgreSQL database — saves accounts and finance records
```

The frontend and backend are separate applications. The frontend does not connect directly to PostgreSQL; it asks the backend to do that work.

## 3. Technologies and what they do

| Technology | Simple explanation |
|---|---|
| React | Builds the website screens and interactive forms. |
| React Router | Connects website URLs to the right screen. |
| Vite | Runs the frontend locally and creates its production build. |
| Java | Programming language used for the backend. |
| Spring Boot | Runs and organizes the backend application. |
| Spring MVC | Turns HTTP requests into calls to backend controller methods. |
| Spring Security | Checks sign-in sessions and protects API requests. |
| Spring Data JPA / Hibernate | Helps Java code read and write database records. |
| PostgreSQL | Database that keeps the information after the app stops. |
| Maven Wrapper | Builds and tests the backend using the project's Maven setup. |
| npm | Installs frontend packages and runs frontend commands. |

## 4. How the backend is organized

The backend separates each job into a layer:

```text
Browser request
      ↓
Controller → understands the URL and HTTP request
      ↓
Service → applies the project rules
      ↓
Repository → asks the database for records or saves them
      ↓
Entity → describes what a database record looks like
```

For example, to add an expense:

1. The frontend sends an expense to `POST /api/expenses`.
2. `ExpenseController` receives the request.
3. Spring Security supplies the signed-in user to the controller.
4. `ExpenseService` attaches that user to the expense.
5. `ExpenseRepository` saves it using JPA.
6. The saved expense is returned to the frontend as JSON.

Keeping these responsibilities separate makes code easier to maintain and test. A controller should not contain all database and business logic itself.

## 5. How the frontend is organized

- `src/App.jsx` defines the website routes and which ones need sign-in.
- `src/pages/` contains the landing page, sign-in/register pages, dashboard, and finance pages.
- `src/components/` contains reusable interface pieces such as the navigation bar and protected-route check.
- `src/context/` keeps track of the current signed-in user for the React interface.
- `src/services/api.js` is the shared place that sends requests to the backend.
- `src/App.css` and `src/index.css` contain the page and shared styling.

React's authentication state helps show the right screen, but it is not the security boundary. The backend checks every protected API request too.

## 6. How login and registration work

### Register

1. The user enters an email and password.
2. The frontend sends them to `POST /api/auth/register`.
3. The backend validates the values and stores a BCrypt password hash, not the original password.
4. The frontend signs in with those credentials.

Registration currently requires a password of at least 12 characters.

### Sign in

1. The frontend sends the email and password to `POST /api/auth/login`.
2. Spring Security looks up the user and checks the password against the stored hash.
3. If they match, the backend creates a server-side session.
4. The browser receives a session cookie and automatically sends it with later API requests.

### Sign out

The frontend sends `POST /api/auth/logout`. The backend invalidates the session, so it can no longer be used to access protected APIs.

## 7. Security ideas in plain language

### Authentication and authorization

- **Authentication** means checking who signed in.
- **Authorization** means checking what that user may access.

This app authenticates users with sessions. It authorizes access by querying finance records for the currently signed-in user's ID.

### Password hashing

BCrypt turns a password into a one-way hash before it is stored. The app checks a login password against that hash; it does not decrypt the database value. Never store plain-text passwords.

### Session cookie

The backend keeps session information. The browser keeps a cookie that identifies the session. The cookie is HttpOnly, which prevents ordinary frontend JavaScript from reading the session ID.

### CSRF protection

Browsers automatically send cookies with some requests. CSRF protection requires a separate token for requests that change data, such as adding or deleting an expense. The frontend sends that token in a request header, and Spring Security checks it.

### Data ownership

Each finance record has an owner. The backend uses the signed-in user from the session when reading, updating, or deleting a record. It should not trust a user ID supplied by the browser to decide who owns data.

Records created before accounts were added have no owner. They remain unassigned and are not shown to new accounts.

## 8. Useful routes

| Route | What it is for | Sign-in required? |
|---|---|---|
| `/` | Public landing page | No |
| `/register` | Create an account | No |
| `/login` | Sign in | No |
| `/dashboard` | View your financial summary | Yes |
| `/expenses` | Manage expenses | Yes |
| `/income` | Manage income | Yes |
| `/investments` | Manage investments | Yes |
| `POST /api/auth/register` | Register an account | No, but requires a CSRF token |
| `POST /api/auth/login` | Sign in and create a session | No, but requires a CSRF token |
| `GET /api/auth/me` | Check the current session | Yes |
| `POST /api/auth/logout` | End the session | Yes |
| `/api/expenses`, `/api/income`, `/api/investments` | Create and manage records | Yes |
| `GET /api/dashboard/summary` | Get totals for the signed-in user | Yes |

## 9. How the dashboard calculates its totals

The backend adds up the signed-in user's records:

- **Total income** = sum of income amounts.
- **Total expenses** = sum of expense amounts.
- **Balance** = total income − total expenses.
- **Total invested** = sum of investment amounts invested.
- **Current investment value** = sum of current investment values.
- **Investment profit/loss** = current investment value − total invested.

These are totals across the records currently stored; they are not automatically limited to a particular month.

## 10. Run the project locally

You need Java 17+, Node.js/npm, and PostgreSQL. Create a PostgreSQL database named `personal_finance` and check that the database connection settings in `backend/src/main/resources/application.properties` match your local PostgreSQL setup.

Open two PowerShell windows.

**Window 1 — backend:**

```powershell
cd "D:\MRG Projects\Personal-Finance-Manager\backend"
.\mvnw.cmd spring-boot:run
```

The backend normally runs at `http://localhost:8080`.

**Window 2 — frontend:**

```powershell
cd "D:\MRG Projects\Personal-Finance-Manager\frontend"
npm.cmd install
npm.cmd run dev
```

Open the URL Vite prints, normally `http://localhost:5173`, then choose **Get started** or visit `/register`.

Use the same hostname consistently. `localhost` and `127.0.0.1` count as different browser origins, and the backend's default CORS configuration allows `http://localhost:5173`.

## 11. How to test changes

From the backend folder:

```powershell
.\mvnw.cmd test
```

From the frontend folder:

```powershell
npm.cmd run lint
npm.cmd run build
```

Tests are important because a page looking correct does not prove that the backend protects users' data correctly.

## 12. Interview-ready explanation

Here is a short explanation you can practice:

> “I worked on a personal finance manager built with React and Vite on the frontend, a Java Spring Boot REST API on the backend, and PostgreSQL for storage. Users can manage income, expenses, and investments and see a dashboard calculated from their own records. The backend is organized into controllers, services, repositories, and JPA entities. I added session-based authentication with Spring Security, BCrypt password hashing, CSRF protection, and user-scoped database queries so users can only access their own finance data.”

Only say “I built” or “I implemented” for work you personally understand and can explain. Be ready to describe one example end to end, such as adding an expense.

### Common interviewer questions

**Why use separate frontend and backend applications?**  
The frontend focuses on the user experience, while the backend owns data access, application rules, and security. They communicate through HTTP APIs.

**Why use a service layer?**  
It keeps application rules out of the controller and makes those rules easier to reuse and test.

**Why use sessions instead of JWT?**  
This is a browser-based application. A server-side session and HttpOnly cookie are a straightforward option, and the browser does not need to store a bearer token in JavaScript.

**How do you stop one user from viewing another user's expenses?**  
The backend identifies the user from the authenticated session and queries records using that user's ID. It does not rely on a user ID submitted by the frontend.

**Is BCrypt encryption?**  
No. BCrypt is a one-way password hashing algorithm. The app verifies a password against the hash instead of decrypting it.

**What would you improve next?**  
Possible next steps include password reset, email verification, login rate limiting, production HTTPS and secret management, and using `BigDecimal` instead of `double` for financial amounts.

## 13. Important things to remember

- Do not put database passwords, session secrets, or other credentials in source control.
- Production should use HTTPS and secure session cookies.
- Production CORS should allow only the actual frontend origin, not every website.
- Always enforce authorization in the backend, even if the frontend hides a page.
- Use precise decimal types such as `BigDecimal` for production money calculations.
- This project currently does not include email verification, password recovery, or login rate limiting.

## 14. A good way to learn the code

Pick one feature and trace it through the project:

```text
React page → api.js → backend controller → service → repository → entity/database
```

For example, trace adding an expense through `Expenses.jsx`, `api.js`, `ExpenseController.java`, `ExpenseService.java`, and `ExpenseRepository.java`. Then trace how the dashboard uses the same user's records to calculate totals.
