import express from "express";
import {
  addPhone,
  getUserData,
  updateUserProfile,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/profile", getUserData);
router.put("/profile", updateUserProfile);
router.post("/phone", addPhone);
export default router;
