import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { addPhone, getUserData } from '../controllers/userController.js';
const router = express.Router();

router.use(authenticateToken);

router.get('/profile',getUserData);
router.post('/phone',addPhone);

export default router;