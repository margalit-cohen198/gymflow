// import express from 'express';
// // import { authenticateToken } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Get all active clients for a trainer
// router.get('/clients', authenticateToken, async (req, res) => {
//     try {
//         // Mock data for now
//         const clients = [
//             { id: 1, name: 'רחל גולדברג', nextSession: '2024-06-09' },
//             { id: 2, name: 'יוסי מזרחי', nextSession: '2024-06-10' },
//             { id: 3, name: 'מיכל אברהם', nextSession: '2024-06-11' }
//         ];
//         res.json(clients);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get today's sessions for a trainer
// router.get('/sessions/today', authenticateToken, async (req, res) => {
//     try {
//         // Mock data for now
//         const sessions = [
//             { id: 1, time: '09:00', client: 'דניאל לוי', type: 'אימון כוח' },
//             { id: 2, time: '11:00', client: 'מיכל כהן', type: 'אימון פונקציונלי' },
//             { id: 3, time: '16:00', client: 'יוסי אברהם', type: 'אימון אישי' }
//         ];
//         res.json(sessions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get statistics for a trainer
// router.get('/statistics', authenticateToken, async (req, res) => {
//     try {
//         // Mock data for now
//         const statistics = {
//             activeClients: 22,
//             monthlyWorkouts: 56,
//             attendanceRate: 92
//         };
//         res.json(statistics);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;
