# E-commerce Web Application

A web-store project with a React frontend and a Node.js/Express API backed by MongoDB.

## Project structure

- `frontend/` — React 19 + Vite 7 application.
- `backend/` — Express 4 API using Mongoose.

## Frontend pages

The current router defines these pages:

- Home
- Login and sign up
- About
- Product listing and product details
- Shopping cart
- Admin dashboard

The interface uses React Router, Axios, Tailwind CSS 4, Radix UI components and Sonner notifications.

## Backend API

The Express server connects to MongoDB and mounts these route groups:

| Base path | Purpose |
| --- | --- |
| `/api/auth` | Authentication routes |
| `/api/brand` | Brand routes |
| `/api/category` | Category routes |

Additional product, order or checkout capabilities should only be documented after their API routes are implemented and verified.

## Requirements

- Node.js and npm
- MongoDB (local or hosted)

## Run locally

Run the backend and frontend in separate terminals.

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5001
MONGODB_CONNECTIONSTRING=your_mongodb_connection_string
```

Start the API:

```bash
npm run dev
```

The API defaults to port `5001`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

## Scripts

Frontend (`frontend/`):

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview the build
- `npm run lint` — run ESLint

Backend (`backend/`):

- `npm run dev` — start with nodemon
- `npm start` — start with Node.js

## Configuration and security

- Configure the frontend API URL to match the backend environment.
- Keep MongoDB connection strings and authentication secrets in local environment files.
- Never commit real credentials or private keys.

## Project status

This documentation reflects the routes, pages and package scripts currently visible in the repository. It does not imply that all shopping workflows, automated tests or production deployment have been verified.
