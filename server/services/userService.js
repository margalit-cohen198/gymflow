// services/userService.js
import pool from '../config/db.js';

//#region Database Operations
/**
 * בדיקה האם משתמש קיים לפי אימייל
 * @param {string} email - כתובת האימייל לחיפוש
 * @returns {Promise<Object|null>} אובייקט המשתמש אם נמצא, או null אם לא נמצא
 */
export async function findUserByEmail(email) {
    if (!email) {
        throw new Error('Email is required');
    }

    const connection = await pool.getConnection();
    try {
        const [users] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        return users[0];
    } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

//#region User Creation
/**
 * יצירת משתמש חדש
 * @param {Object} userData - נתוני המשתמש
 * @param {string} userData.first_name - שם פרטי
 * @param {string} userData.last_name - שם משפחה
 * @param {string} userData.email - כתובת אימייל
 * @param {string} userData.phone_number - מספר טלפון
 * @param {string} userData.user_type - סוג משתמש
 * @returns {Promise<number>} ID של המשתמש החדש
 */
export async function createUser(userData) {
    const { first_name, last_name, email, phone_number, user_type } = userData;
    
    // בדיקת תקינות השדות
    if (!first_name) throw new Error('First name is required');
    if (!last_name) throw new Error('Last name is required');
    if (!email) throw new Error('Email is required');
    if (!phone_number) throw new Error('Phone number is required');
    if (!user_type) throw new Error('User type is required');

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            `INSERT INTO users (first_name, last_name, email, phone_number, user_type) 
             VALUES (?, ?, ?, ?, ?)`,
            [first_name, last_name, email, phone_number, user_type]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

//#region User Authentication
/**
 * שמירת פרטי התחברות
 * @param {number} userId - מזהה המשתמש
 * @param {string} password_hash - הסיסמה המוצפנת
 * @returns {Promise<void>}
 */
export async function saveUserCredentials(userId, password_hash) {
    if (!userId) throw new Error('User ID is required');
    if (!password_hash) throw new Error('Password hash is required');

    const connection = await pool.getConnection();
    try {
        await connection.execute(
            `INSERT INTO user_credentials (user_id, password_hash) 
             VALUES (?, ?)`,
            [userId, password_hash]
        );
    } catch (error) {
        throw new Error(`Failed to save user credentials: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

//#region Profile Management
/**
 * יצירת פרופיל מתאמן
 * @param {number} userId - מזהה המשתמש
 * @param {string} date_of_birth - תאריך לידה
 * @param {string} gender - מין
 * @returns {Promise<void>}
 */
export async function createTraineeProfile(userId, date_of_birth, gender) {
    if (!userId) throw new Error('User ID is required');
    if (!date_of_birth) throw new Error('Date of birth is required');
    if (!gender) throw new Error('Gender is required');

    const connection = await pool.getConnection();
    try {
        await connection.execute(
            `INSERT INTO trainees (user_id, date_of_birth, gender) 
             VALUES (?, ?, ?)`,
            [userId, date_of_birth, gender]
        );
    } catch (error) {
        throw new Error(`Failed to create trainee profile: ${error.message}`);
    } finally {
        connection.release();
    }
}

/**
 * יצירת פרופיל מאמן
 * @param {number} userId - מזהה המשתמש
 * @param {string} specialization - התמחות
 * @param {string} bio - תיאור אישי
 * @returns {Promise<void>}
 */
export async function createTrainerProfile(userId, specialization, bio) {
    if (!userId) throw new Error('User ID is required');
    if (!specialization) throw new Error('Specialization is required');
    // bio יכול להיות אופציונלי, אז לא נבדוק אותו

    const connection = await pool.getConnection();
    try {
        await connection.execute(
            `INSERT INTO trainers (user_id, specialization, bio) 
             VALUES (?, ?, ?)`,
            [userId, specialization, bio]
        );
    } catch (error) {
        throw new Error(`Failed to create trainer profile: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

//#region User Retrieval
/**
 * קבלת פרטי משתמש מלאים
 * @param {string} email - כתובת האימייל של המשתמש
 * @returns {Promise<Object>} אובייקט המשתמש המלא כולל הסיסמה המוצפנת
 */
export async function getUserWithCredentials(email) {
    if (!email) {
        throw new Error('Email is required');
    }

    const connection = await pool.getConnection();
    try {
        const [users] = await connection.execute(
            `SELECT u.*, uc.password_hash 
             FROM users u 
             JOIN user_credentials uc ON u.id = uc.user_id 
             WHERE u.email = ?`,
            [email]
        );

        if (!users.length) {
            throw new Error('User not found');
        }

        return users[0];
    } catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

//#region Class Schedule
/**
 * מביא את כל החוגים של המשתמש לפי תאריכים
 * @param {number} userId - מזהה המשתמש
 * @param {Date} startDate - תאריך התחלה (אופציונלי)
 * @param {Date} endDate - תאריך סיום (אופציונלי)
 * @returns {Promise<Array>} רשימת החוגים של המשתמש
 */
export async function getUserClassSchedule(userId, startDate = null, endDate = null) {
    if (!userId) throw new Error('User ID is required');

    const connection = await pool.getConnection();
    try {
        let query = `
            SELECT 
                c.*,
                r.name as room_name,
                r.capacity as room_capacity,
                u.first_name as trainer_first_name,
                u.last_name as trainer_last_name,
                cr.status as registration_status
            FROM classes c
            INNER JOIN class_registrations cr ON c.id = cr.class_id
            INNER JOIN rooms r ON c.room_id = r.id
            INNER JOIN trainers t ON c.trainer_id = t.user_id
            INNER JOIN users u ON t.user_id = u.id
            WHERE cr.trainee_id = ?
            AND c.is_active = TRUE`;

        const params = [userId];

        // הוספת סינון לפי תאריכים אם סופקו
        if (startDate) {
            query += ' AND c.start_time >= ?';
            params.push(startDate);
        }
        if (endDate) {
            query += ' AND c.end_time <= ?';
            params.push(endDate);
        }

        // מיון לפי תאריך ושעה
        query += ' ORDER BY c.start_time ASC';

        const [classes] = await connection.execute(query, params);
        
        // עיבוד התוצאות לפורמט נוח יותר
        return classes.map(cls => ({
            id: cls.id,
            name: cls.name,
            description: cls.description,
            startTime: cls.start_time,
            endTime: cls.end_time,
            room: {
                name: cls.room_name,
                capacity: cls.room_capacity
            },
            trainer: {
                fullName: `${cls.trainer_first_name} ${cls.trainer_last_name}`
            },
            maxCapacity: cls.max_capacity,
            status: cls.registration_status
        }));
    } catch (error) {
        throw new Error(`Failed to get user class schedule: ${error.message}`);
    } finally {
        connection.release();
    }
}
//#endregion

