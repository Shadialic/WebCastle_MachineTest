import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEventData } from "../controllers/userController.js";
const router = express.Router();

router.use(authenticateToken);

router.get("/calendar", getEventData);

export default router;
