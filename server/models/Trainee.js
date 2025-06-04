// models/Trainee.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // נתיב לחיבור ה-DB
import User from './User.js'; // ייבוא מודל User, כי יש קשר

const Trainee = sequelize.define('Trainee', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User, // מתייחס למודל User
            key: 'id',
        },
        onDelete: 'CASCADE', // אם משתמש נמחק, גם רשומת המתאמן תימחק
    },
    date_of_birth: {
        type: DataTypes.DATEONLY, // DATEONLY עבור תאריך ללא זמן
        allowNull: true, // לפי הסכימה, יכול להיות NULL
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true, // לפי הסכימה, יכול להיות NULL
    },
}, {
    tableName: 'trainees',
    timestamps: false, // מכיוון שהטבלה trainees לא מכילה created_at/updated_at
});

// הגדרת קשר 1:1 בין User ל-Trainee
// Trainee שייך ל-User (כלומר, לכל Trainee יש User אחד תואם)
Trainee.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
// User יכול להיות Trainee (כלומר, לכל User יכול להיות Trainee אחד תואם)
User.hasOne(Trainee, { foreignKey: 'user_id', sourceKey: 'id' });


export default Trainee;