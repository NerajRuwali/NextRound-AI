import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Trophy, Medal, Star, Target, Users, LayoutDashboard, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard`);
        if (response.data.success) {
          setLeaders(response.data.leaderboard);
        }
      } catch (error) {
         // validation error dropped
      } finally {
         setTimeout(() => setLoading(false), 500);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankStyles = (rank) => {
    switch (rank) {
      case 1: return "bg-gradient-to-br from-amber-300 to-amber-600 text-black border-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)]";
      case 2: return "bg-gradient-to-br from-slate-300 to-slate-500 text-black border-slate-200 shadow-[0_0_20px_rgba(148,163,184,0.3)]";
      case 3: return "bg-gradient-to-br from-orange-400 to-orange-700 text-white border-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.3)]";
      default: return "bg-white/5 text-indigo-300 border-white/10";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-amber-500" />;
      case 2: return <Medal className="w-5 h-5 text-slate-400" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <span className="w-5 h-5 flex items-center justify-center font-bold text-white/30">#</span>;
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-10 relative z-10 flex flex-col">
          
        {/* Header Block */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg flex items-center justify-center text-white shrink-0">
                 <Trophy className="w-6 h-6" />
               </div>
               <div>
                 <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Top Performers</h1>
                 <p className="text-indigo-200/50 text-sm font-medium">Global rankings evaluated across all architectural nodes and algorithmic accuracy.</p>
               </div>
           </div>
           
           <button 
             onClick={() => navigate('/dashboard')}
             className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 max-w-fit"
           >
             <LayoutDashboard className="w-4 h-4" /> Back to Dashboard
           </button>
        </motion.div>

        {/* Global Rankings Card */}
        <div className="glass-panel p-2 md:p-6 overflow-hidden flex-1 flex flex-col relative">
           
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

           {/* Table Header */}
           <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
              <div className="col-span-2 md:col-span-1 flex justify-center">Rank</div>
              <div className="col-span-6 md:col-span-5">Candidate Name</div>
              <div className="col-span-4 md:col-span-3 flex justify-end md:justify-start">Average Score</div>
              <div className="hidden md:flex md:col-span-3 justify-end items-center gap-2"><Target className="w-3 h-3"/> Total Interviews</div>
           </div>

           {/* Content State */}
           {loading ? (
             <div className="flex flex-col p-4 gap-4 animate-pulse pt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 w-full bg-white/5 rounded-2xl"></div>
                ))}
             </div>
           ) : leaders.length === 0 ? (
             <div className="flex flex-col items-center justify-center flex-1 py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Rankings Available</h3>
                <p className="text-sm text-white/50 max-w-md">Data aggregation protocols are waiting for the first wave of successful FAANG interviews to execute.</p>
             </div>
           ) : (
             <motion.div variants={containerVars} initial="hidden" animate="show" className="flex flex-col gap-3 p-4">
                {leaders.map((user) => (
                   <motion.div 
                     key={user.rank}
                     variants={itemVars}
                     whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                     className={`grid grid-cols-12 gap-4 px-4 md:px-6 py-4 md:py-5 rounded-2xl items-center transition-all cursor-default border border-transparent ${
                        user.rank <= 3 ? "bg-white/5 shadow-lg border-white/10" : "hover:border-white/5"
                     }`}
                   >
                     {/* Rank Badge */}
                     <div className="col-span-2 md:col-span-1 flex justify-center relative">
                        {user.rank <= 3 && (
                           <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 z-0"></div>
                        )}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border z-10 ${getRankStyles(user.rank)}`}>
                           {user.rank}
                        </div>
                     </div>
                     
                     {/* Username */}
                     <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                        <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/10 items-center justify-center border border-white/10 shrink-0">
                           {getRankIcon(user.rank)}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-white text-base truncate pr-2">{user.username}</span>
                           {user.rank === 1 && <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">Global Rank 1</span>}
                        </div>
                     </div>

                     {/* Avg Score */}
                     <div className="col-span-4 md:col-span-3 flex justify-end md:justify-start items-center">
                        <div className="px-3 md:px-4 py-1.5 md:py-2 bg-[#020617] rounded-lg border border-white/10 flex items-center gap-2">
                           <Star className="w-3.5 h-3.5 text-indigo-400 hidden sm:block" />
                           <span className="font-mono font-bold text-white text-sm">{user.averageScore} <span className="text-white/30 text-xs hidden sm:inline">/ 10</span></span>
                        </div>
                     </div>

                     {/* Total Sessions (Hidden on very small screens) */}
                     <div className="hidden md:flex md:col-span-3 justify-end">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                           <span className="font-bold text-white">{user.totalInterviews}</span>
                           <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Sessions</span>
                        </div>
                     </div>
                   </motion.div>
                ))}
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
