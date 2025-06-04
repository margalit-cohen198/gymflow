// models/User.js (דוגמה עם Sequelize)
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // הגדרת חיבור ל-DB

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING },
    user_type: { type: DataTypes.ENUM('trainee', 'trainer', 'admin'), allowNull: false },
    profile_picture_url: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW },
}, {
    tableName: 'users',
    timestamps: false // אם אתה רוצה ש-Sequelize יטפל ב-timestamps אוטומטית, שנה ל-true
});

export default User;