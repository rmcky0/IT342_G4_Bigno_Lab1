import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-container" style={{ padding: '20px' }}>
            <h1>User Dashboard</h1>
            <p>Welcome back, {user.username}! This is a protected area.</p>
            
            <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px' }}>
                <h3>Profile Information</h3>
                <p><strong>Username:</strong> {user.username}</p>
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