import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "questions must be a non-empty array.",
      },
    },
    answers: {
      type: [
        new mongoose.Schema(
          {
            question: { type: String, required: true, trim: true },
            answer: { type: String, required: true, trim: true },
            score: { type: Number, required: true, min: 1, max: 10 },
            feedback: { type: String, required: true },
            suggestions: { type: [String], default: [] },
            createdAt: { type: Date, default: Date.now },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;

