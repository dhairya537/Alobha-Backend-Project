# Scalable Task & Workspace Management System

A production-ready backend project built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

This project implements secure authentication, authorization, validation, logging, API protection, and scalable backend architecture.

## Features

* User Registration
* User Login / Logout
* JWT Authentication
* Role-based Authorization
* Secure Password Hashing (bcrypt)
* Input Validation (Zod)
* Error Handling Middleware
* Request Logging (Pino Logger)
* Rate Limiting
* Security Middleware (Helmet, CORS, Cookie Parser)
* Modular Folder Structure
* MongoDB Database Integration

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Pino Logger
* Express Rate Limit
* Cookie Parser
* Helmet
* CORS

---

## Project Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
```

### 2. Move into project folder

```bash
cd Alobha-Project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in root folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build Project

```bash
npm run build
```

### 7. Start Production Server

```bash
npm start
```

---

## Install Required Packages Manually

If needed, install all packages using:

```bash
npm install express mongoose bcryptjs jsonwebtoken cookie-parser cors helmet zod pino pino-http express-rate-limit dotenv
```

For TypeScript:

```bash
npm install -D typescript tsx @types/node @types/express @types/cookie-parser @types/jsonwebtoken
```

---

## Project Structure

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validators/
├── types/
└── server.ts
```

---

## API Endpoints

### Authentication Routes

* POST /api/register
* POST /api/login
* POST /api/logout
* GET /api/profile

---

## Security Features

* Password hashing using bcrypt
* JWT token authentication
* Protected routes middleware
* Role-based access control
* Rate limiting for API protection
* Secure headers with Helmet
* Cookie-based authentication

---

## Logging

Implemented using Pino logger for:

* Request logging
* Error logging
* Debugging

---


## Author

Dhairya Tiwari
