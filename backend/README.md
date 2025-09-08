# Library Management Backend

Spring Boot REST API for Library Management System with JWT authentication and MongoDB integration.

## Features

- RESTful API endpoints for book management
- JWT-based authentication and authorization
- User roles (Admin, Member)
- MongoDB integration with Spring Data
- Book borrowing and returning functionality
- Search functionality for books
- CORS configuration for frontend integration
- Input validation and error handling

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Authenticate user
```

### Book Management Endpoints
```
GET    /api/books              - Get all books
GET    /api/books/available    - Get available books only
GET    /api/books/search       - Search books by title/author
POST   /api/books              - Add new book
PUT    /api/books/{id}/borrow  - Borrow a book
PUT    /api/books/{id}/return  - Return a book
```

## Running the Application

1. Ensure MongoDB is running on localhost:27017
2. Run the application:
```bash
mvn spring-boot:run
```

The application will start on http://localhost:8080

## Configuration

Application configuration is in `src/main/resources/application.yml`:
- MongoDB connection string
- JWT secret and expiration
- Server port configuration

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "username": "string",
  "password": "string (encrypted)",
  "role": "ADMIN|MEMBER"
}
```

### Books Collection
```json
{
  "_id": "ObjectId", 
  "title": "string",
  "author": "string",
  "isbn": "string",
  "available": "boolean"
}
```