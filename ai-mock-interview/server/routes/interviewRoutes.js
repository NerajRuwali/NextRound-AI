import express from "express";
import { getInterviewById, submitAnswer, getInterviewHistory, getPerformance } from "../controllers/interviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/interview/history
router.get("/history", protect, getInterviewHistory);

// GET /api/interview/performance
router.get("/performance", protect, getPerformance);

// POST /api/interview/answer
router.post("/answer", protect, submitAnswer);

// GET /api/interview/:id
router.get("/:id", protect, getInterviewById);

export default router;
