import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

class AuthService {
    async register(username, email, password) {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            username,
            email,
            password
        });
        return response.data;
    }

    async login(username, password) {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            username,
            password
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                username: username
            }));
        }
        
        return response.data;
    }

    async logout() {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                await axios.post(`${API_BASE_URL}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService();
