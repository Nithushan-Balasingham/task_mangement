# Task Management System

## Project Overview

This project is a simple **Task Management System** built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). It allows users to create, update, delete, and filter tasks based on priority and due date.

## Folder Structure

```bash
project-root/
│
├── client/             # React (frontend)
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/             # Node.js & Express (backend)
│   ├── src/
│   │   └── index.js
│   ├── migrations/
│   ├── models/
│   ├── config/
│   ├── .env.example
│   ├── knexfile.js
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml  # (optional) For Dockerized environment setup
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **PostgreSQL** (or a cloud-based Postgres DB like Heroku, Supabase, etc.)
- **npm** (Node Package Manager)
- **Git** (for version control)

### Cloning the Repository

Clone (or fork) the repository to your local machine

```bash
git clone https://github.com/amplify-lk/technical-assessment-se.git
cd technical-assessment-se
```

---

## Setting Up the Frontend (Client)

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file by copying the example:

   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file and add the API URL for the backend:

   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The React app will now be running on `http://localhost:3000`.

---

## Setting Up the Backend (Server)

1. Navigate to the `server` directory:

   ```bash
   cd ../server
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file by copying the example:

   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your PostgreSQL database connection details:

   ```bash
   DB_HOST=localhost
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=task_management_db
   DB_PORT=5432
   ```

5. Set up the PostgreSQL database:

   - Ensure PostgreSQL is running locally or connect to your cloud Postgres database.
   - Run migrations (if using Knex.js):
     ```bash
     npx knex migrate:latest
     ```

6. Start the Express server:
   ```bash
   node src/index.js
   ```

The Express app will now be running on `http://localhost:5000`.

---

## Running Both Client and Server

To run both the client and server simultaneously, follow these steps:

1. **Terminal 1**: Start the React frontend:

   ```bash
   cd client
   npm start
   ```

2. **Terminal 2**: Start the Express backend:
   ```bash
   cd server
   node src/index.js
   ```

The client will be running on `http://localhost:3000` and the backend API on `http://localhost:5000`.

---

## API Endpoints (Backend)

The following endpoints are available in the API:

- **GET /tasks**: Fetch all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update a task by ID.
- **DELETE /tasks/:id**: Delete a task by ID.

---

## Environment Variables

The following environment variables need to be configured:

- **Client (React)**:
  - `REACT_APP_API_URL`: The base URL of the backend API.
- **Server (Express)**:
  - `DB_HOST`: Hostname of the PostgreSQL server.
  - `DB_USER`: PostgreSQL username.
  - `DB_PASSWORD`: PostgreSQL password.
  - `DB_NAME`: Database name.
  - `DB_PORT`: PostgreSQL server port (default: 5432).

---

Upon completion, push the changes to GitHub.

