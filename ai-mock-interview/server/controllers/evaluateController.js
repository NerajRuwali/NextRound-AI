function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function normalize(text) {
  return String(text || "").trim();
}

function splitWords(text) {
  return normalize(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function scoreAnswer(question, answer) {
  const q = normalize(question);
  const a = normalize(answer);

  const words = splitWords(a);
  const length = a.length;

  // Baseline: length/coverage/structure heuristics (deterministic “mock AI”)
  let score = 1;

  // Length heuristic
  if (length >= 60) score += 2;
  if (length >= 140) score += 2;
  if (length >= 280) score += 1;

  // Structure cues
  const hasSteps =
    /\b(first|second|third|finally|next)\b/i.test(a) ||
    /(\n|\r|\-|\*)/.test(a);
  if (hasSteps) score += 1;

  // Example/impact cues
  const hasExample = /\b(example|for instance|e\.g\.)\b/i.test(a);
  const hasMetrics = /\b(ms|seconds|%|percent|latency|throughput|qps|sla)\b/i.test(a);
  if (hasExample) score += 1;
  if (hasMetrics) score += 1;

  // Relevance: overlap some keywords from question
  const qWords = splitWords(q);
  const qSet = new Set(qWords.filter((w) => w.length >= 4));
  const overlap = words.reduce((acc, w) => acc + (qSet.has(w) ? 1 : 0), 0);
  if (overlap >= 2) score += 1;
  if (overlap >= 5) score += 1;

  // Penalize very short / empty / filler
  const fillerOnly =
    words.length > 0 &&
    words.every((w) => ["idk", "dont", "know", "yes", "no", "maybe"].includes(w));
  if (words.length < 10) score -= 1;
  if (fillerOnly) score -= 2;

  score = clamp(Math.round(score), 1, 10);

  const feedbackParts = [];
  if (score >= 8) feedbackParts.push("Strong answer: clear and relevant.");
  else if (score >= 5) feedbackParts.push("Decent answer, but it can be clearer and more complete.");
  else feedbackParts.push("Needs improvement: add more detail and structure.");

  if (!hasSteps) feedbackParts.push("Consider structuring your response (steps, trade-offs, and a conclusion).");
  if (!hasExample) feedbackParts.push("Add a concrete example from a project or a scenario.");
  if (length < 140) feedbackParts.push("Expand with specifics: what you did, why, and the result.");

  const suggestions = [];
  if (!hasSteps) suggestions.push("Use a simple structure: context → approach → trade-offs → result.");
  if (!hasExample) suggestions.push("Include a brief real-world example (what you built, your role, outcome).");
  if (!hasMetrics) suggestions.push("Add measurable impact when possible (latency, errors reduced, time saved).");
  suggestions.push("Mention edge cases and how you’d validate/monitor in production.");

  return {
    score,
    feedback: feedbackParts.join(" "),
    suggestions,
  };
}

export async function evaluateAnswer(req, res) {
  try {
    const { question, answer } = req.body || {};

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "question and answer are required.",
      });
    }

    const result = scoreAnswer(question, answer);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error evaluating answer.",
    });
  }
}

