# 📌 Degree Project - Reporting and Request Management System for CAE

This project is an internal management system designed to handle lost items, reports, software requests, and user management for an organization. It exposes a RESTful API built with Node.js, Express, and Prisma ORM connected to a MySQL database.

It includes optional JWT-based authentication via a middleware (authMiddleware). Authentication can be enabled for routes that require it, but it is not enforced by default, allowing flexibility for future customization by school staff or project maintainers.

## Table of Contents

- Main Technologies

- Project Structure

- Setup & Installation

- Environment Variables

- Database Setup

- Execution

- Testing

- API Endpoints

- Authentication

- Development Workflow

- Important Notes

- Future Improvements

- Authors

## 🚀 Main Technologies

- Node.js (v18+)

- Express.js

- TypeScript

- Prisma ORM (with MySQL)

- MySQL

- JWT (JSON Web Tokens) for authentication

- Jest (testing framework)

## 📂 Project Structure
```
/backend
├── prisma/                # Database schema definition
│   ├── migrations/        # Migration history
│   └── schema.prisma
├── src/
│   ├── constants/         # Global project constants
│   ├── controllers/       # Controllers (bridge between routes and services)
│   ├── generated/         # Auto-generated Prisma client (do not edit)
│   ├── routes/            # API endpoints definition
│   ├── services/          # Business logic
│   ├── utils/             # Helpers and shared utilities
│   ├── app.ts             # Express main configuration
│   ├── index.ts           # Server entry point
│   ├── prisma.ts          # Prisma client configuration
│   └── types.d.ts         # Type definitions for handled data
├── tests/
│   ├── integration/       # Integration tests (endpoints)
│   └── unit/              # Unit tests (DB queries)
├── .env                   # Local environment variables
├── .env.test              # Testing environment variables
├── jest.config.ts         # Jest configuration
└── tsconfig.json          # TypeScript configuration
```

## ⚙️ Setup & Installation
### 1. Clone the repository

```cmd
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Environment variables

Inside backend/, create a .env file:
```js
DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_bd"
PORT=3000
```

For testing, create a .env.test:
```js
DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_bd_test"
```

### 3. Install dependencies

```cmd
cd backend
npm install
```

### 4. Database setup

Apply Prisma migrations:
```cmd
cd backend
npx prisma migrate dev --name init
```

Generate the Prisma client:
```cmd
npx prisma generate
```

## ▶️ Running the Project

```cmd
cd backend
npm run dev
```

## 🧪 Testing

Tests are implemented with Jest.

Run tests:

```cmd
cd backend
npm run test
```
🔹 Tests use the database defined in .env.test.
During execution, prisma migrate deploy is run to apply the schema for the test DB.

### Test Configuration

- Test files are located in the tests/ directory.
- Must follow the naming convention: *.test.ts.
- Jest is configured for Node.js + TypeScript (ts-jest).

**jest.config.js:**

```jsx
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};
```


## 🔑 Endpoints

| Resource | Endpoint | Method | Description |
| --- | --- | --- | --- |
| Lost Items | `/lost-items` | GET | Get all lost items |
| Lost Item | `/lost-items/:id` | GET | Get a lost item by ID |
|  | `/lost-items` | POST | Create a lost item |
|  | `/lost-items/:id` | PUT | Update a lost item |
|  | `/lost-items/:id` | DELETE | Delete a lost item |
| Reports | `/reports` | GET | Get all reports |
| Reports | `/reports/:id` | GET | Get report by ID |
|  | `/reports` | POST | Create a report |
|  | `/reports/:id` | PUT | Update a report |
|  | `/reports/:id` | DELETE | Delete a report |
| Software Requests | `/software-requests` | GET | Get all software requests |
| Software Requests | `/software-requests/:id` | GET | Get software request by ID |
|  | `/software-requests` | POST | Create a software request |
|  | `/software-requests/:id` | PUT | Update a software request |
|  | `/software-requests/:id` | DELETE | Delete a software request |
| Users | `/users` | GET | Get all users |
| Users | `/users/:id` | GET | Get user by ID |
|  | `/login` | POST | Login a user |
|  | `/users` | POST | Create a user (signup) |
|  | `/users/:id` | PUT | Update user |
|  | `/users/:id` | DELETE | Delete user |

## 🔐 Authentication

> The API uses JWT-based authentication.
> 
> 
> This project includes JWT-based authentication with a pre-configured middleware (`authMiddleware`), located in `src/utils/auth.ts`.
> 
> However,**authentication is not enforced by default** across routes, leaving it up to the next maintainers or the school’s team to decide how and where to secure the API.
> 
> To use it properly, clients must include the JWT token in the `Authorization` header:
> 
> ```
> Authorization: Bearer <your_token_here>
> ```
> 
> JWTs are signed using the secret defined in the environment variable `JWT_SECRET`.
> 
> To access protected routes, include the token in the `Authorization` header as `Bearer <token>`.
> 
> Example:
> 
> ```
> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
> ```
>

## 👩‍💻 Development Workflow

1. Create a new branch from main.

2. Implement feature (in services + controllers + routes).

3. Add unit tests in tests/.

4. Run npm test before committing.

5. Push changes and open a Pull Request.

## 📖 Important Notes

- .env is not versioned (use .env.example as reference).
- prisma/migrations/ is versioned to track DB changes.
- Tests run on an isolated database defined in .env.test.
- The frontend connects to backend at http://localhost:3000 (configurable).

## 🏗️ Future Improvements

- Enforce JWT authentication.
- Role-based access (admin, teacher, student).
- Full frontend integration testing.
- Dockerization for full deployment.

## ✨ Authors

Developed as part of a Degree Project.

Backend - Node.js / Prisma / MySQL

- Lucero Martinez Bryan de Jesús

- Martínez Ortíz Danyaell

Testing (Jest)

- Martínez Ortíz Danyaell
