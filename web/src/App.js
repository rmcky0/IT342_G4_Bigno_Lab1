import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
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
          {/* Login route is ignored for now as requested */}
          <Route path="/login" element={<h2>Login Page (Work in Progress)</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;