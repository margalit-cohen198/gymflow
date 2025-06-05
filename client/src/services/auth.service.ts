import axios from 'axios';
import { LoginCredentials, RegistrationData, User } from '../types/user';

const API_URL = 'http://localhost:3001/api';
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const AuthService = {
    async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
        const response = await axiosInstance.post('/auth/login', credentials);
        if (response.data.token) {
            this.setAuthToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async register(data: RegistrationData): Promise<{ user: User; token: string }> {
        const response = await axiosInstance.post('/auth/register', data);
        if (response.data.token) {
            this.setAuthToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axiosInstance.defaults.headers.common['Authorization'];
    },
    
    setAuthToken(token: string) {
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getAuthToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }
};
