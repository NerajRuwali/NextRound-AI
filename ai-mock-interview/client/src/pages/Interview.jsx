import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Clock, CheckCircle2, AlertCircle, Sparkles, ChevronRight, XCircle } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { interview } = location.state || {};

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [scores, setScores] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Feedback specific states
  const [showFeedback, setShowFeedback] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!interview) navigate("/dashboard");
  }, [interview, navigate]);

  useEffect(() => {
    if (submitting || !interview || showFeedback) return;

    if (timeLeft <= 0) {
      handleSubmitAnswer();
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitting, interview, showFeedback]);

  if (!interview) return null;

  const currentQuestion = interview.questions[currentIdx];
  const totalQuestions = interview.questions.length;
  const progressPercent = Math.round((currentIdx / totalQuestions) * 100);

  const handleSubmitAnswer = async () => {
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const finalAnswer = answer.trim() ? answer : " ";

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/answer`,
        { interviewId: interview._id, question: currentQuestion, answer: finalAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;
      const feedbackPayload = {
        question: currentQuestion,
        answer: finalAnswer,
        score: data.score,
        feedback: data.feedback,
        suggestions: data.suggestions,
      };

      setResults(prev => [...prev, feedbackPayload]);
      setScores(prev => [...prev, data.score]);
      setLatestFeedback(feedbackPayload);
      setShowFeedback(true);
      
    } catch (err) {
      // connection logic fails gracefully
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
      setAnswer("");
      setTimeLeft(60);
    } else {
      navigate("/performance", { state: { scores } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setAnswer(answer.substring(0, start) + "  " + answer.substring(end));
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
      }, 0);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (score >= 5) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  };

  return (
    <div className="flex flex-col h-screen text-black font-bold font-sans bg-transparent z-10 relative">
      <Navbar />

      <main className="flex-1 flex overflow-hidden mt-20 pt-4 px-4 pb-4 max-w-[1600px] mx-auto w-full gap-4 relative">
        
        {/* Left Pane - System Design / Question Context */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }} 
           animate={{ opacity: 1, x: 0 }} 
           className="w-1/3 glass-panel flex flex-col overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-[50px]"></div>
          
          <div className="p-6 border-b border-white/10 shrink-0">
             <div className="flex items-center justify-between mb-4">
               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-gray-300 text-[10px] uppercase font-bold tracking-widest rounded-md border border-white/10">
                 <BrainCircuit className="w-3.5 h-3.5" /> Node {currentIdx + 1}
               </div>
               <div className="text-xs font-mono text-white/40">ID:{interview._id?.substring(0,8)}</div>
             </div>
             <h2 className="text-xl font-bold leading-snug tracking-tight text-white">
               {currentQuestion}
             </h2>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto z-10">
             <div className="bg-gray-500/20 border border-yellow-400/20 rounded-xl p-5 backdrop-blur-sm">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Sparkles className="w-4 h-4" /> AI Constraint Directives
                </h4>
                <p className="text-sm text-gray-300/70 leading-relaxed font-medium">
                   The analysis engine is evaluating your architectural decisions strictly at a <strong className="text-white">{interview.experience}</strong> level. Time and space efficiency will heavily impact your node score.
                </p>
             </div>
          </div>
        </motion.div>

        {/* Right Pane - IDE & Feedback Split */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }} 
           animate={{ opacity: 1, x: 0 }} 
           className="w-2/3 flex flex-col gap-4 relative"
        >
          
          {/* Header Dashboard Overlay */}
          <div className="glass-panel h-16 shrink-0 flex items-center justify-between px-6 z-10">
            <div className="flex items-center gap-4 w-1/2">
               <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progressPercent}%` }}
                     className="h-full bg-black border border-yellow-400 text-yellow-400"
                  />
               </div>
               <span className="text-xs font-bold text-white/50">{progressPercent}% Core</span>
            </div>

            <div className={`px-4 py-1.5 rounded-full border text-sm font-bold flex items-center gap-2 transition-all duration-300 backdrop-blur-md ${
                timeLeft < 10 && !showFeedback
                  ? "bg-yellow-400/20 border-yellow-400/50 text-yellow-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse" 
                  : "bg-white/5 border-white/10 text-black font-bold shadow-lg"
              }`}>
                <Clock className="w-4 h-4" />
                {showFeedback ? 'Evaluation Halted' : `${timeLeft}s Remaining`}
            </div>
          </div>

          <div className="glass-panel flex-1 flex flex-col overflow-hidden relative">
            <div className="h-12 border-b border-white/10 bg-black/20 flex items-end px-4 backdrop-blur-md">
               <div className="px-5 py-2.5 bg-white/5 border-t border-l border-r border-white/10 rounded-t-lg text-xs font-mono text-gray-300 relative min-w-[140px] flex items-center justify-center shadow-lg">
                 solution.ts
                 <div className="absolute top-0 w-full h-0.5 bg-yellow-400 left-0 rounded-t-lg"></div>
               </div>
               <div className="px-5 py-2.5 text-xs font-mono text-white/30">terminal.sh</div>
            </div>

            <div className="flex-1 relative bg-[#0c1222]/80">
              <textarea
                ref={textareaRef}
                className="w-full h-full bg-transparent text-gray-300 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 p-6 z-10 relative selection:bg-yellow-500/30"
                placeholder="// Initialize optimized algorithm..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                disabled={submitting || showFeedback}
              />
              <div className="absolute right-6 top-6 text-xs font-mono text-white/20 pointer-events-none">
                {answer.length} bytes
              </div>
            </div>

            <div className="h-16 border-t border-white/10 bg-white/5 flex items-center justify-between px-6 shrink-0 backdrop-blur-md">
               <div className="text-xs font-mono text-white/40 flex items-center gap-4">
                  <span>Ln {answer.split('\n').length}, Col {answer.length - answer.lastIndexOf('\n') - 1}</span>
                  <span>UTF-8</span>
               </div>
               
               <motion.button
                 whileHover={{ scale: (submitting || showFeedback) ? 1 : 1.02 }}
                 whileTap={{ scale: (submitting || showFeedback) ? 1 : 0.98 }}
                 onClick={handleSubmitAnswer}
                 disabled={submitting || showFeedback}
                 className={`px-8 py-2.5 text-white font-bold text-sm rounded-lg flex items-center gap-2 transition-all ${
                   submitting || showFeedback ? "opacity-50 cursor-not-allowed bg-white/10 border border-white/10" : "bg-yellow-400 hover:bg-yellow-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                 }`}
               >
                 {submitting ? (
                    <>
                       <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Running Tests...
                    </>
                 ) : (
                    <>Submit Compilation</>
                 )}
               </motion.button>
            </div>
            
            {/* Feedback Score Overlay */}
            <AnimatePresence>
              {showFeedback && latestFeedback && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl p-8 flex flex-col justify-center items-center rounded-2xl border border-white/10"
                >
                   <div className="max-w-2xl w-full">
                     <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-bold text-sm mb-6 ${getScoreColor(latestFeedback.score)} shadow-lg`}>
                        {latestFeedback.score >= 8 ? <CheckCircle2 className="w-4 h-4"/> : latestFeedback.score >= 5 ? <AlertCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                        Evaluation Score: {latestFeedback.score} / 10
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-4">Node Analyzed</h3>
                     <p className="text-gray-300/80 leading-relaxed mb-6 bg-white/5 p-6 rounded-xl border border-white/10">
                       {latestFeedback.feedback}
                     </p>
                     
                     {latestFeedback.suggestions?.length > 0 && (
                       <div className="mb-8">
                         <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Architectural Improvements</h4>
                         <ul className="space-y-2">
                            {latestFeedback.suggestions.map((sug, i) => (
                               <li key={i} className="flex gap-3 text-sm text-gray-300/90 items-start">
                                  <ChevronRight className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> {sug}
                               </li>
                            ))}
                         </ul>
                       </div>
                     )}

                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextQuestion}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                     >
                        {currentIdx + 1 < totalQuestions ? 'Continue to Next Node' : 'Initialize Performance Matrix'}
                     </motion.button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>
      </main>
    </div>
  );
}