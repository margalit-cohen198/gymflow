// app.js
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/db.js'; // ייבוא אובייקט החיבור ל-DB
// server.js (או הקובץ הראשי שלך)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // מאפשר לנתח גוף בקשות JSON

// ראוט בסיסי עבור נתיב ה-root
app.get('/', (req, res) => {
    res.send('Welcome to the GymFlow API!');
});

// הגדרת ראוטי API
app.use('/api/auth', authRoutes); // דוגמה לראוטים לאימות

// סנכרון מסד הנתונים והפעלת השרת
sequelize.sync({ force: false }) // force: true ימחק ויצור מחדש את הטבלאות בכל הרצה (לא מומלץ בפרודקשן!)
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });
