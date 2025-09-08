# Library Management System

A full-stack web application for managing library books with user authentication and role-based access control.

## Features

### Backend (Spring Boot + MongoDB)
- ✅ REST API for book management (CRUD operations)
- ✅ JWT-based authentication
- ✅ User roles (Admin, Member)
- ✅ MongoDB integration
- ✅ Book borrowing/returning functionality
- ✅ Search books by title/author
- ✅ Clean, modular code with comments
- ✅ API documentation (Postman Collection)

### Frontend (React + Vite + TypeScript)
- ✅ Responsive web application
- ✅ View all available books
- ✅ Search books by title/author
- ✅ Borrow/return books
- ✅ Redux state management
- ✅ Authentication (login/logout)
- ✅ Mobile and desktop responsive design
- ✅ Clean, modular, reusable components

## Tech Stack

**Backend:**
- Java 21
- Spring Boot 3.2.0
- Spring Security
- Spring Data MongoDB
- JWT (JSON Web Tokens)
- Maven

**Frontend:**
- React 18
- TypeScript
- Vite
- Redux Toolkit
- Axios
- Tailwindcss and Daisyui(for quick build)

**Database:**
- MongoDB

## Prerequisites

- Java 17+
- Node.js 18+
- MongoDB (running on localhost:27017)
- Maven

## Setup Instructions

### Option 1: Docker (Recommended)
```bash
# Run with docker-compose
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- MongoDB: localhost:27017

### Option 2: Manual Setup

#### 1. Database Setup
```bash
# Start MongoDB service
<as per your system>
# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend will run on http://localhost:8080

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/available` - Get available books
- `GET /api/books/search?query=` - Search books
- `POST /api/books` - Add new book
- `PUT /api/books/{id}/borrow` - Borrow book
- `PUT /api/books/{id}/return` - Return book

## API Documentation

Import the `Library_Management_API.postman_collection.json` file into Postman for complete API documentation and testing.

## Default Users

Admin User details for Admin Login in Library Management System:
- Admin: username=`admin`, password=`password123`, role=`ADMIN`

## Project Structure

```
Library management/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/library/management/
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity models
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       ├── security/    # JWT utilities
│   │       └── config/      # Configuration
│   └── pom.xml
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── store/          # Redux store
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── package.json
└── Library_Management_API.postman_collection.json
```

## Features Demo

1. **Authentication**: Register/Login with JWT tokens
2. **Book Management**: Add, view, search books
3. **Borrowing System**: Borrow and return books
4. **Responsive Design**: Works on mobile and desktop
5. **State Management**: Redux for client-side state
6. **Search Functionality**: Real-time book search
7. **Role-based Access**: Admin and Member roles

