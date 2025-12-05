# Pizza Builder

A full-stack web application for building and managing custom pizzas.

## Prerequisites

You can use

- Docker & Docker Compose

Without docker you will need:

- Node.js >= 22.0.0
- pnpm (package manager)

## Running the Project

### Option 1: Run with Docker Compose

Build and start both services with a single command:

```bash
docker  compose  up  --build
```

This will start:

- **Backend** at `http://localhost:3000`

- **Frontend** at `http://localhost:4173`

To stop the services:

```bash
docker  compose  down
```

---

### Option 2: Run Locally (Development)

#### 1. Start the Backend

```bash
cd  backend
pnpm  install
pnpm  dev
```

The backend API will be available at `http://localhost:3000`

#### 2. Start the Frontend

In a separate terminal:

```bash
cd  frontend
pnpm  install
pnpm  dev
```

The frontend will be available at `http://localhost:5173`

## Tests

There are unit tests on the backend API to run them you need to enter the `backend` folder and run:

```bash
pnpm test
```
