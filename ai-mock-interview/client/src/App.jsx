import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Analytics from "./pages/Analytics";
import RevisionHub from "./pages/RevisionHub";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import LearnDSA from "./pages/LearnDSA";
import LearningPath from "./pages/LearningPath";
import CodePractice from "./pages/CodePractice";
import AiCoach from "./pages/AiCoach";
import Community from "./pages/Community";
import Referrals from "./pages/Referrals";
import Performance from "./pages/Performance";
import Certificates from "./pages/Certificates";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout pageTitle="Dashboard"><Dashboard /></Layout>} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Layout pageTitle="Interview Results"><Result /></Layout>} />
        <Route path="/analytics" element={<Layout pageTitle="Career Analytics"><Analytics /></Layout>} />
        <Route path="/revision-hub" element={<Layout pageTitle="Revision Hub"><RevisionHub /></Layout>} />
        <Route path="/resume-analyzer" element={<Layout pageTitle="Resume Parsing Engine"><ResumeAnalyzer /></Layout>} />
        <Route path="/learn/path" element={<Layout pageTitle="90-Day FAANG Roadmap"><LearningPath /></Layout>} />
        <Route path="/learn/dsa" element={<Layout pageTitle="DSA Pattern Mastery"><LearnDSA /></Layout>} />
        <Route path="/practice/code" element={<Layout pageTitle="Competitive Programming"><CodePractice /></Layout>} />
        <Route path="/practice/coach" element={<Layout pageTitle="System Design Coach"><AiCoach /></Layout>} />
        <Route path="/community" element={<Layout pageTitle="Developer Community"><Community /></Layout>} />
        <Route path="/referrals" element={<Layout pageTitle="Refer & Earn"><Referrals /></Layout>} />
        <Route path="/certificates" element={<Layout pageTitle="Digital Credentials"><Certificates /></Layout>} />
        <Route path="/leaderboard" element={<Layout pageTitle="Top Performers"><Leaderboard /></Layout>} />
        <Route path="/history" element={<Layout pageTitle="Session Log"><History /></Layout>} />
        <Route path="/performance" element={<Layout pageTitle="Performance Analytics"><Performance /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;