// controllers/authController.js
import authService from '../services/authService.js';
// פה הולך הלוגיקה
class AuthController {
    async register(req, res) {
        try {
            const newUser = await authService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);
            res.status(200).json({ message: 'Login successful', token, user });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController();