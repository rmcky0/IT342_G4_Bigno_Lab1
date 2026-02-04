import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const result = await register(formData.username, formData.email, formData.password);
        
        if (result.success) {
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className="register-container">
            <h2>Register Account</h2>
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{ color: 'green', marginBottom: '10px' }}>
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange}
                    value={formData.username}
                    required
                    disabled={loading}
                />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                    value={formData.email}
                    required
                    disabled={loading}
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    value={formData.password}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Register;