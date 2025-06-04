// app.js
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/db.js'; // ייבוא אובייקט החיבור ל-DB

dotenv.config(); // טען משתני סביבה מ-.env

const app = express();
app.use(express.json()); // מאפשר ל-Express לקרוא JSON בבקשות

// נתיבי אימות
app.use('/api/auth', authRoutes);

// סינכרון עם מסד הנתונים והפעלת השרת
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // 'force: true' ימחק וייצור מחדש את הטבלאות (רק בפיתוח!)
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });