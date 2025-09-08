# Library Management Frontend

React TypeScript application with Redux state management for the Library Management System.

## Features

- Responsive web interface for library management
- User authentication (login/register)
- Book browsing and searching
- Book borrowing and returning
- Redux state management
- TypeScript for type safety
- Mobile-first responsive design

## Tech Stack

- React 18
- TypeScript
- Vite (build tool)
- Redux Toolkit
- Axios (HTTP client)
- CSS3 (responsive design)

## Components

- `Login` - User authentication form
- `Register` - User registration form  
- `BookList` - Display and manage books
- `App` - Main application component

## State Management

Redux store with slices:
- `authSlice` - Authentication state and actions
- `bookSlice` - Book management state and actions

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will start on http://localhost:5173

## Build for Production

```bash
npm run build
```

## API Integration

The frontend communicates with the backend API running on http://localhost:8080. API endpoints are configured in `src/services/api.ts`.

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (< 768px)