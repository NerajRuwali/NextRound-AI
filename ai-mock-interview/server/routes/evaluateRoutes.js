import express from "express";
import { evaluateAnswer } from "../controllers/evaluateController.js";

const router = express.Router();

// POST /api/ai/evaluate
router.post("/evaluate", evaluateAnswer);

export default router;

