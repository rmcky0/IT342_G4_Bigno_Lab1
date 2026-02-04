import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("User logged out");
        // Next week: Clear tokens/session here
        navigate('/login');
    };

    return (
        <div className="dashboard-container" style={{ padding: '20px' }}>
            <h1>User Dashboard</h1>
            <p>Welcome back! This is a protected area.</p>
            
            <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px' }}>
                <h3>Profile Information</h3>
                <p><strong>Status:</strong> Authenticated</p>
                <p><strong>Role:</strong> Student / User</p>
            </div>

            <button 
                onClick={handleLogout} 
                style={{ marginTop: '20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;