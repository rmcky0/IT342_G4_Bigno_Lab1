import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Simple Navigation Header */}
          <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <Link to="/register" style={{ marginRight: '15px' }}>
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </nav>

          {/* Route Definitions */}
          <Routes>
            <Route path="/" element={<h1>Welcome to Mini App. Please Login or Register.</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;