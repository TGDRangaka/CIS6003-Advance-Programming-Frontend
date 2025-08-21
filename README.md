# Bookshop Management System - Frontend

This repository contains the frontend for a Bookshop Management System, developed as part of the CIS6003 Advanced Programming course. It is a modern React TypeScript application with a clean, responsive user interface and robust state management.

## Core Technologies

*   **React**: Modern JavaScript library for building user interfaces.
*   **TypeScript**: Strongly typed programming language that builds on JavaScript.
*   **Vite**: Fast build tool and development server.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
*   **Zustand**: Lightweight state management library for React.
*   **Axios**: Promise-based HTTP client for API requests.
*   **React Router**: Declarative routing for React applications.

## Key Features

*   **Bookshop Management**: Complete system for managing books, customers, and sales
*   **Bill Management**: Create bills and view bill history
*   **Customer Management**: Add, edit, and manage customer information
*   **Item/Book Management**: Inventory management for books and items
*   **Authentication System**: Secure login with AuthProvider wrapper
*   **State Management**: Zustand-powered auth store for global state
*   **API Integration**: Configured Axios instance with base URL for seamless backend communication
*   **Responsive Design**: Tailwind CSS for mobile-first, responsive layouts
*   **Type Safety**: Full TypeScript implementation for better development experience
*   **Protected Routes**: Authentication-based route protection
*   **Help System**: Comprehensive help sections for different features

## Backend Repository

The backend for this bookshop management system is a Java-based REST API. You can find it here:

**Backend Repository**: [https://github.com/TGDRangaka/CIS6003-Advance-Programming-Backend](https://github.com/TGDRangaka/CIS6003-Advance-Programming-Backend)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: Version 16.0 or later
*   **npm** or **yarn**: Package manager (npm comes with Node.js)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/TGDRangaka/CIS6003-Advance-Programming-Frontend.git
cd CIS6003-Advance-Programming-Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── api/
│   └── api.ts              # Axios instance with base URL configuration
├── components/
│   ├── helpSection/        # Help-related components
│   │   ├── BillHelp.tsx
│   │   ├── CustomerHelp.tsx
│   │   ├── ItemHelp.tsx
│   │── AuthProvider.tsx
│   └── Layout.tsx          # Main layout component
├── pages/
│   ├── BillHistory.tsx     # Bill history page
│   ├── CreateBill.tsx      # Create new bill page
│   ├── Customer.tsx        # Customer management
│   ├── Dashboard.tsx       # Main dashboard
│   ├── HelpSection.tsx     # Help section page
│   ├── Item.tsx           # Item management
│   └── Login.tsx          # Login page
├── store/
│   └── authStore.ts       # Zustand authentication store
├── App.tsx                # Main app with routing
└── main.tsx              # Application entry point
```

## Key Architecture Decisions

### State Management with Zustand

The application uses Zustand for lightweight, efficient state management:

```typescript
// Example authStore structure
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

### API Integration

The `src/api/api.ts` file contains the Axios instance configuration with:
- Base URL pointing to the Java backend
- Request/response interceptors for authentication
- Error handling and token management

```typescript
// Example api.ts structure
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/library-management-1.0-SNAPSHOT/api',
  timeout: 10000,
});

// Request interceptor for auth headers
// Response interceptor for error handling
```

### Authentication Flow

1. **AuthProvider** (located in `src/components/AuthProvider.tsx`) wraps the router in `App.tsx`
2. Uses Zustand store (`src/store/authStore.ts`) for global authentication state
3. Protects routes based on authentication status
4. Manages token storage and validation
5. Integrates with the `api` instance for authenticated requests

### Routing Structure

The application uses React Router with the following routes:
- `/` - Dashboard (protected)
- `/dashboard` - Main dashboard (protected)
- `/customer` - Customer management (protected)
- `/item` - Item management (protected)  
- `/create-bill` - Create new bill (protected)
- `/bill-history` - View bill history (protected)
- `/help` - Help section (protected)
- `/*` - Redirects to dashboard for any undefined routes

## Available Scripts

*   `npm run dev` - Start development server
*   `npm run build` - Build for production
*   `npm run preview` - Preview production build locally
*   `npm run lint` - Run ESLint for code quality

## Backend Integration

This frontend is designed to work with the Java-based backend. To run the complete system:

1. Set up and run the backend server (see backend repository)
2. Configure the base URL for backend
3. Start this frontend application
4. The frontend will communicate with the backend through the configured API endpoints

## Styling with Tailwind CSS

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Custom color schemes
- Component-based styling approach
- Dark/light mode support (if implemented)

## Authentication Features

- User login/logout functionality
- Protected route handling
- Persistent authentication state
- Token-based authentication with the backend
- Automatic token refresh (if implemented)


## Screenshots of system

### Register Page
<img width="1901" height="917" alt="register" src="https://github.com/user-attachments/assets/fdaed584-60a2-4a1b-af79-49cee3615a25" />

### Login Page
<img width="1901" height="918" alt="login" src="https://github.com/user-attachments/assets/6f663dc2-4c42-4d55-9f50-deeee8806da3" />

### Dashboard Page
<img width="1889" height="911" alt="dashboard" src="https://github.com/user-attachments/assets/ad6eb0de-b763-425a-83e0-45a51461b607" />

### Customer Management Page
<img width="1908" height="909" alt="customer management" src="https://github.com/user-attachments/assets/cf03433e-416b-452c-ae47-0697a89e4e80" />

### Item Manamagement Page
<img width="1901" height="913" alt="item management" src="https://github.com/user-attachments/assets/a82cccc3-9255-41d6-84de-e0d5c00448a0" />

### Bill Create Page
<img width="1900" height="911" alt="bill create" src="https://github.com/user-attachments/assets/29b7571d-fe16-4c1f-9800-f093b5a52412" />

### Bill History Page
<img width="1899" height="911" alt="bill history" src="https://github.com/user-attachments/assets/932db705-f7e4-4ac1-9236-19b8babb5a74" />

### Help Section Page
<img width="1884" height="912" alt="help section" src="https://github.com/user-attachments/assets/2ab7b836-bade-42b4-8ecf-f262cab4a99f" />
