import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({ totalInterviews: { $gt: 0 } })
      .sort({ averageScore: -1, totalInterviews: -1 })
      .limit(10)
      .select("name averageScore totalInterviews bestScore");

    const leaderboardData = topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.name,
      averageScore: user.averageScore,
      totalInterviews: user.totalInterviews,
      bestScore: user.bestScore
    }));

    return res.status(200).json({
      success: true,
      leaderboard: leaderboardData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error generating leaderboard."
    });
  }
};
