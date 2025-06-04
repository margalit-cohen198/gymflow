// services/authService.js
import User from '../models/User.js';
import Trainee from '../models/Trainee.js';
import Trainer from '../models/Trainer.js';
import { hashPassword, comparePassword } from '../utils/authUtils.js';
import jwt from 'jsonwebtoken'; // לסשנים (tokens)

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key'; // טוקן סודי מהגדרות סביבה!

class AuthService {
    async register(userData) {
        const { first_name, last_name, email, password, phone_number, user_type, date_of_birth, gender, specialization, bio } = userData;

        // 1. בדוק אם המייל כבר קיים
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already registered.');
        }

        // 2. הצפן סיסמה
        const password_hash = await hashPassword(password);

        // 3. צור משתמש בטבלת users [cite: 22]
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password_hash,
            phone_number,
            user_type,
        });

        // 4. צור רשומה בטבלה הספציפית (trainees או trainers) [cite: 24, 25]
        if (user_type === 'trainee') {
            await Trainee.create({
                user_id: newUser.id,
                date_of_birth,
                gender,
            });
        } else if (user_type === 'trainer') {
            await Trainer.create({
                user_id: newUser.id,
                specialization,
                bio,
            });
        } else {
             // אולי צריך לטפל במנהל
             // או לזרוק שגיאה אם user_type אינו חוקי עבור רישום עצמי
        }

        // 5. החזר אובייקט משתמש (ללא סיסמה)
        const userResponse = newUser.toJSON();
        delete userResponse.password_hash;
        return userResponse;
    }

    async login(email, password) {
        // 1. מצא משתמש לפי מייל [cite: 22]
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials.');
        }

        // 2. השווה סיסמאות
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        // 3. צור טוקן JWT
        const token = jwt.sign(
            { id: user.id, user_type: user.user_type, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // תוקף הטוקן
        );

        // 4. החזר טוקן ופרטי משתמש בסיסיים
        const userResponse = user.toJSON();
        delete userResponse.password_hash;
        return { token, user: userResponse };
    }
}

export default new AuthService();