import express from 'express';
const router = express.Router();
import userRoutes from '../routes/user.js';

// ...existing code...
router.use('/user', userRoutes);
// ...existing code...


export default router;
