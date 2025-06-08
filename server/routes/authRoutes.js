// routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import pkg from 'jsonwebtoken';
import { verifyToken } from '../middleware/authMiddleware.js';
const { verify } = pkg;

const router = express.Router();

// נתיבי אותנטיקציה
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/myBord',verifyToken, (req, res) => {
    // כאן ניתן להוסיף לוגיקה ליציאה מהמערכת, כמו מחיקת טוקן או סשן     
    });
export default router;