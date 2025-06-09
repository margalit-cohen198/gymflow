// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../services/authService.js';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied - No token provided' });
  }

  try {
    // בדוק האם הטוקן ב-blacklist
    if (isTokenBlacklisted(token)) {
      return res.status(401).json({ error: 'Token has been invalidated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.id;
    req.userType = decoded.user_type;
    req.token = token; // שמור את הטוקן בבקשה לשימוש ב-logout
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userType !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const isTrainer = (req, res, next) => {
  if (req.userType !== 'trainer') {
    return res.status(403).json({ error: 'Trainer access required' });
  }
  next();
};

const isTrainee = (req, res, next) => {
  if (req.userType !== 'trainee') {
    return res.status(403).json({ error: 'Trainee access required' });
  }
  next();
};

export { verifyToken, isAdmin, isTrainer, isTrainee };