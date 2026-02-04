# Frontend-Backend Integration Guide

## Overview
This guide explains how the React frontend connects to the Spring Boot backend authentication API.

## Architecture

### Backend API Endpoints
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User authentication (returns JWT token)
- **POST** `/api/auth/logout` - Token invalidation

### Frontend Components

#### 1. **AuthService** (`web/src/services/authService.js`)
Handles all HTTP requests to the backend API:
- `register(username, email, password)` - Registers new user
- `login(username, password)` - Authenticates user and stores token
- `logout()` - Invalidates token and clears local storage
- `getCurrentUser()` - Retrieves user from localStorage
- `isAuthenticated()` - Checks if user has valid token

#### 2. **AuthContext** (`web/src/context/AuthContext.js`)
Provides global authentication state management:
- Wraps the entire app with `<AuthProvider>`
- Exports `useAuth()` hook for accessing auth state
- Manages user state and loading states
- Provides login, register, logout functions to all components

#### 3. **ProtectedRoute** (`web/src/components/ProtectedRoute.js`)
Guards routes that require authentication:
- Redirects unauthenticated users to login page
- Used to protect the Dashboard route

#### 4. **Updated Pages**
- **Login.js** - Calls backend login API, handles errors, redirects on success
- **Register.js** - Calls backend register API, shows success message
- **Dashboard.js** - Protected route, displays user info, handles logout

## Setup Instructions

### 1. Start the Backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend will run on `http://localhost:8080`

### 2. Start the Frontend
```bash
cd web
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## Usage Flow

### Registration
1. Navigate to `/register`
2. Fill in username, email, and password
3. Submit form → API call to `/api/auth/register`
4. On success → Redirect to login page
5. On error → Display error message

### Login
1. Navigate to `/login`
2. Enter username/email and password
3. Submit form → API call to `/api/auth/login`
4. On success → Token stored in localStorage → Redirect to `/dashboard`
5. On error → Display error message

### Dashboard (Protected)
1. Navigate to `/dashboard`
2. ProtectedRoute checks authentication
3. If not authenticated → Redirect to `/login`
4. If authenticated → Display user info
5. Logout button → API call to `/api/auth/logout` → Clear storage → Redirect to login

## API Configuration

The backend API URL is configured in `authService.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/auth';
```

To change the backend URL, update this constant.

## Token Management

- JWT token stored in `localStorage.getItem('token')`
- User info stored in `localStorage.getItem('user')`
- Token sent in Authorization header: `Bearer <token>`
- Token cleared on logout

## CORS Configuration

The backend AuthController has CORS enabled:
```java
@CrossOrigin(origins = "*")
```

For production, configure specific origins in application.properties.

## Troubleshooting

### CORS Errors
Ensure backend has `@CrossOrigin` annotation or CORS configuration.

### Connection Refused
- Check if backend is running on port 8080
- Check if frontend API_BASE_URL is correct

### 401 Unauthorized
- Token may be expired or invalid
- User may need to login again

### Registration Fails
- User might already exist
- Check backend validation rules
- Check database connectivity

## Next Steps

To implement a PasswordEncoder implementation, you can:
1. Use BCrypt: Add Spring Security dependency
2. Create BCryptPasswordEncoder bean
3. Inject into AuthService

Example:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```
