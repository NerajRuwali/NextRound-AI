import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { History as HistoryIcon, Target, Search, Clock, CheckCircle2, XCircle, Code2, ChevronRight, LayoutDashboard } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/interview/history", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setHistory(response.data.history);
        }
      } catch (error) {
         // silently absorb error logic
      } finally {
         setTimeout(() => setLoading(false), 500);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreColor = (score, max) => {
    const ratio = score / max;
    if (ratio >= 0.8) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (ratio >= 0.5) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col pt-20 selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 relative z-10 flex flex-col">
          
        {/* Header Block */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg flex items-center justify-center text-white shrink-0">
                 <HistoryIcon className="w-6 h-6" />
               </div>
               <div>
                 <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Session History</h1>
                 <p className="text-indigo-200/50 text-sm font-medium">Review past architectural mock interviews and track your node progression.</p>
               </div>
           </div>
           
           <button 
             onClick={() => navigate('/dashboard')}
             className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 max-w-fit"
           >
             <LayoutDashboard className="w-4 h-4" /> Back to Dashboard
           </button>
        </motion.div>

        {/* Content State */}
        {loading ? (
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                 <div key={i} className="h-64 bg-white/5 rounded-[2rem] border border-white/5"></div>
              ))}
           </div>
        ) : history.length === 0 ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex-1 flex flex-col items-center justify-center text-center p-8 glass-card border-dashed border-white/10 rounded-[3rem]"
           >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6 relative">
                 <Search className="w-10 h-10 absolute" />
                 <div className="w-24 h-24 border border-white/10 rounded-full animate-[spin_4s_linear_infinite]"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No History Found</h2>
              <p className="text-indigo-200/50 max-w-md mx-auto mb-8 leading-relaxed">
                 You haven't initialized any FAANG evaluation sessions yet. Your telemetry data will populate here once you complete an interview.
              </p>
           </motion.div>
        ) : (
           <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {history.map((session) => {
                 const isCompleted = session.answers && session.answers.length > 0;
                 const maxPossibleScore = session.questions.length * 10;
                 return (
                    <motion.div 
                      key={session._id}
                      variants={itemVars}
                      whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      onClick={() => isCompleted && setSelectedSession(session)}
                      className={`glass-card p-8 rounded-[2rem] border border-white/10 flex flex-col relative overflow-hidden transition-all duration-300 ${isCompleted ? "cursor-pointer group" : "cursor-default opacity-70"}`}
                    >
                       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                       <div className="flex justify-between items-start mb-6 align-top">
                          <div className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border flex items-center gap-1.5 ${
                             isCompleted ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" : "bg-black/40 text-gray-500 border-white/10"
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-3 h-3"/> : <XCircle className="w-3 h-3"/>}
                            {isCompleted ? "Completed" : "Abandoned"}
                          </div>
                          <div className="text-xs font-mono text-white/30 truncate max-w-[100px]">{session._id}</div>
                       </div>

                       <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{session.role}</h3>
                       <p className="text-sm font-medium text-indigo-200/50 mb-6 flex items-center gap-2">
                          <Target className="w-4 h-4" /> {session.experience} Bracket
                       </p>

                       <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end relative z-10 w-full">
                          <div>
                             <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3"/> Initialized</div>
                             <div className="text-xs font-medium text-white/80">{formatDate(session.createdAt)}</div>
                          </div>
                          
                          {isCompleted && (
                             <div className={`px-4 py-2 rounded-xl text-center border shadow-lg ${getScoreColor(session.totalScore || 0, maxPossibleScore)}`}>
                                <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Avg Acc</div>
                                <div className="text-lg font-black font-mono leading-none mt-1">
                                   {Math.round(((session.totalScore || 0) / maxPossibleScore) * 100)}%
                                </div>
                             </div>
                          )}
                       </div>
                    </motion.div>
                 );
              })}
           </motion.div>
        )}

      </main>

      {/* Interactive Modal Overlay for Deep Session Data */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="w-full max-w-4xl max-h-[90vh] bg-[#0c1222] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col"
            >
               <button 
                  onClick={() => setSelectedSession(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10 z-20 hover:bg-white/10"
               >
                  ✕
               </button>

               <div className="mb-8 border-b border-white/10 pb-6 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest rounded-md border border-indigo-500/30">
                        {selectedSession.experience}
                     </div>
                     <div className="text-xs font-mono text-white/40">{formatDate(selectedSession.createdAt)}</div>
                  </div>
                  <h2 className="text-3xl font-black text-white">{selectedSession.role} Evaluation</h2>
               </div>

               {/* Answers Scroll List */}
               <div className="overflow-y-auto flex-1 pr-4 space-y-6 custom-scrollbar">
                  {selectedSession.answers?.map((ans, idx) => (
                     <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                           <h4 className="font-bold text-white text-lg leading-snug">
                              <span className="text-indigo-400 font-mono mr-2">Q{idx+1}.</span> 
                              {ans.question}
                           </h4>
                           <div className={`px-3 py-1 rounded-lg border font-black text-sm shrink-0 ${getScoreColor(ans.score, 10)}`}>
                              {ans.score}/10
                           </div>
                        </div>

                        <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-4">
                           <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><Code2 className="w-3 h-3"/> Submitted Solution</div>
                           <p className="text-white/60 font-mono text-sm leading-relaxed whitespace-pre-wrap">{ans.answer}</p>
                        </div>

                        <div>
                           <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">AI Node Analysis</div>
                           <p className="text-indigo-200 text-sm leading-relaxed mb-4">{ans.feedback}</p>
                           
                           {ans.suggestions?.length > 0 && (
                             <ul className="space-y-1">
                                {ans.suggestions.map((sug, i) => (
                                   <li key={i} className="flex gap-2 text-sm text-indigo-300 items-start">
                                      <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" /> {sug}
                                   </li>
                                ))}
                             </ul>
                           )}
                        </div>
                     </div>
                  ))}
               </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
