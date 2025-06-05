// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const isTrainer = (req, res, next) => {
  if (req.userRole !== 'trainer') {
    return res.status(403).json({ error: 'Trainer access required' });
  }
  next();
};

const isTrainee = (req, res, next) => {
  if (req.userRole !== 'trainee') {
    return res.status(403).json({ error: 'Trainee access required' });
  }
  next();
};

export default { verifyToken, isAdmin, isTrainer, isTrainee };