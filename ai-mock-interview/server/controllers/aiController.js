import Interview from "../models/Interview.js";

function ensureStringArray5(input) {
  const arr = Array.isArray(input) ? input : [];
  const cleaned = arr
    .map((q) => (typeof q === "string" ? q.trim() : ""))
    .filter(Boolean);

  // Pad or truncate to strictly 5 questions for predictable UI mapping
  const out = cleaned.slice(0, 5);
  while (out.length < 5) out.push(`Question ${out.length + 1}`);
  return out;
}

function buildQuestions(role, experience) {
  const r = String(role || "").trim();
  const e = String(experience || "").trim();

  return ensureStringArray5([
    `Tell me about yourself and your journey as a ${r} (${e} experience).`,
    `Describe an end-to-end project you built that is relevant to a ${r}. What were the trade-offs?`,
    `How would you design a scalable API for a ${r} use-case using Node/Express and MongoDB?`,
    `Explain a tricky bug or production issue you faced (or could face) as a ${r}. How did you debug and prevent it?`,
    `What are best practices you follow for security and performance in MERN apps at ${e} level?`,
  ]);
}

export const generateQuestions = async (req, res) => {
  try {
    const { role, experience } = req.body || {};
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (!role || !experience) {
      return res.status(400).json({
        success: false,
        message: "role and experience are required.",
      });
    }

    const questions = buildQuestions(role, experience);

    const interview = await Interview.create({
      userId,
      role: String(role).trim(),
      experience: String(experience).trim(),
      questions,
    });

    return res.status(200).json({
      _id: interview._id,
      questions: ensureStringArray5(interview.questions),
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error generating questions.",
    });
  }
};