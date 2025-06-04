// models/Trainer.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // נתיב לחיבור ה-DB
import User from './User.js'; // ייבוא מודל User, כי יש קשר

const Trainer = sequelize.define('Trainer', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User, // מתייחס למודל User
            key: 'id',
        },
        onDelete: 'CASCADE', // אם משתמש נמחק, גם רשומת המאמן תימחק
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true, // לפי הסכימה, אין NOT NULL
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true, // לפי הסכימה, NULLABLE
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // לפי הסכימה
    },
}, {
    tableName: 'trainers',
    timestamps: false, // מכיוון שהטבלה trainers לא מכילה created_at/updated_at
});

// הגדרת קשר 1:1 בין User ל-Trainer
// Trainer שייך ל-User (כלומר, לכל Trainer יש User אחד תואם)
Trainer.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
// User יכול להיות Trainer (כלומר, לכל User יכול להיות Trainer אחד תואם)
User.hasOne(Trainer, { foreignKey: 'user_id', sourceKey: 'id' });

export default Trainer;