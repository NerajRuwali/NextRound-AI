import mongoose from "mongoose";
import Interview from "../models/Interview.js";
import User from "../models/User.js";
import { scoreAnswer } from "./evaluateController.js";

export async function submitAnswer(req, res) {
  try {
    const { interviewId, question, answer } = req.body || {};

    if (!interviewId || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: "interviewId, question, and answer are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interviewId.",
      });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    const { score, feedback, suggestions } = scoreAnswer(question, answer);

    interview.answers.push({
      question,
      answer,
      score,
      feedback,
      suggestions,
      createdAt: new Date(),
    });

    // Calculate aggregate score for current session
    const totalScore = interview.answers.reduce((acc, ans) => acc + ans.score, 0);
    interview.totalScore = totalScore;
    await interview.save();

    // Sync metrics over to the User model for global leaderboard availability
    const user = await User.findById(interview.userId);
    if (user) {
       const allInterviews = await Interview.find({ userId: interview.userId });
       const completedInterviews = allInterviews.filter(i => i.answers && i.answers.length > 0);
       
       user.totalInterviews = completedInterviews.length;
       user.bestScore = Math.max(user.bestScore || 0, totalScore);
       
       if (completedInterviews.length > 0) {
          const totalAccumulatedScore = completedInterviews.reduce((acc, i) => acc + i.totalScore, 0);
          user.averageScore = Number((totalAccumulatedScore / completedInterviews.length).toFixed(2));
       } else {
          user.averageScore = 0;
       }
       await user.save();
    }

    return res.status(200).json({
      success: true,
      score,
      feedback,
      suggestions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error submitting answer.",
    });
  }
}

export async function getInterviewById(req, res) {
  try {
    const { id } = req.params || {};

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview id.",
      });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching interview.",
    });
  }
}

export async function getInterviewHistory(req, res) {
  try {
    const userId = req.user.id;
    const history = await Interview.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching history.",
    });
  }
}

export async function getPerformance(req, res) {
  try {
    const userId = req.user.id;
    const interview = await Interview.findOne({ userId }).sort({ createdAt: -1 });

    if (!interview || !interview.answers || interview.answers.length === 0) {
      return res.status(200).json({
        success: true,
        scores: [],
        labels: [],
        totalScore: 0,
        role: "",
        experience: ""
      });
    }

    const scores = interview.answers.map(ans => ans.score);
    const labels = interview.answers.map((_, idx) => `Q${idx + 1}`);

    return res.status(200).json({
      success: true,
      scores,
      labels,
      totalScore: interview.totalScore || 0,
      role: interview.role,
      experience: interview.experience
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching performance.",
    });
  }
}

