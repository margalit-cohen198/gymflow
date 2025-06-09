// controllers/authController.js
import * as authService from '../services/authService.js';

export async function register(req, res) {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export async function logout(req, res) {
    try {
        const userId = req.userId;
        const token = req.token; // הטוקן שהועבר מה-middleware
        
        const result = await authService.logout(userId, token);
        res.status(200).json({ message: 'Logout successful',result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to logout: ' + error.message });
    }
}