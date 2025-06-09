// routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// נתיבי אותנטיקציה
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logout);

export default router;