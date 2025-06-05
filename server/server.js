// server.js
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import pool from './config/db.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the GymFlow API!');
});

app.use('/api/auth', authRoutes);

// בדיקת חיבור למסד הנתונים והפעלת השרת
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully.');
        connection.release();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });