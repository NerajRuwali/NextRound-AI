import { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Activity, DatabaseBackup, ChevronRight, Target, BrainCircuit, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

function Performance() {
  const location = useLocation();
  const navigate = useNavigate();
  const localScores = location.state?.scores;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ totalScore: 0, role: "", experience: "" });

  useEffect(() => {
    if (localScores && localScores.length > 0) {
       // Fast path if local state provided (e.g. immediately after interview)
       const formattedData = localScores.map((score, idx) => ({
          name: `Q${idx + 1}`,
          score: score
       }));
       
       const total = localScores.reduce((acc, curr) => acc + curr, 0);
       const avg = (total / localScores.length).toFixed(1);

       setData(formattedData);
       setSummary({
          totalScore: `${avg} Avg`,
          role: `${localScores.length} Nodes`,
          experience: "Local Session"
       });
       setLoading(false);
       return;
    }

    const fetchPerformance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/interview/performance`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success && response.data.scores.length > 0) {
          const formattedData = response.data.labels.map((label, idx) => ({
            name: label,
            score: response.data.scores[idx]
          }));
          setData(formattedData);
          setSummary({
            role: res.data.role,
            experience: res.data.experience
          });
        }
      } catch (err) {
        setError("Failed to load performance data.");
      } finally {
         setTimeout(() => setLoading(false), 600);
      }
    };
    fetchPerformance();
  }, [localScores]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
          <p className="text-white font-mono text-xs mb-1 uppercase tracking-widest opacity-50">{label} Logic Node</p>
          <p className="text-2xl font-black text-indigo-400">
             {payload[0].value} <span className="text-sm font-medium text-white/50">/ 10</span>
          </p>
        </div>
      );
    }
    return null;
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
    <div className="min-h-screen text-white font-sans flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 relative z-10 flex flex-col">
          
        {/* Header Block */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white shrink-0">
                 <Activity className="w-6 h-6" />
               </div>
               <div>
                 <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Performance Analytics</h1>
                 <p className="text-indigo-200/50 text-sm font-medium">Tracking historical evaluation accuracy across your most recent FAANG session.</p>
               </div>
           </div>
           
           <button 
             onClick={() => navigate('/dashboard')}
             className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 max-w-fit"
           >
             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </button>
        </motion.div>

        {loading ? (
           <div className="flex-1 flex flex-col gap-6 animate-pulse">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
                <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
                <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
             </div>
             <div className="flex-1 bg-white/5 rounded-3xl w-full min-h-[400px]"></div>
           </div>
        ) : error || data.length === 0 ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex-1 flex flex-col items-center justify-center text-center p-8 glass-card border-dashed border-white/10"
           >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
                 <DatabaseBackup className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No performance data found</h2>
              <p className="text-indigo-200/50 max-w-md mx-auto mb-8 leading-relaxed">
                 You haven't completed a full NextRound AI architecture evaluation yet. Spin up a session to establish your performance baseline.
              </p>
              <a href="/dashboard" className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center gap-2">
                 Initialize Session <ChevronRight className="w-4 h-4" />
              </a>
           </motion.div>
        ) : (
           <motion.div variants={containerVars} initial="hidden" animate="show" className="flex-1 flex flex-col">
              
              {/* Stat Tiles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <motion.div variants={itemVars} className="glass-panel p-8 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors"></div>
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 flex items-center gap-2"><Target className="w-3 h-3 text-indigo-400"/> Aggregate Threshold</span>
                    <span className="text-5xl font-black text-white font-mono mt-1 block">{summary.totalScore}</span>
                 </motion.div>
                 
                 <motion.div variants={itemVars} className="glass-panel p-8 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors"></div>
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 flex items-center gap-2"><BrainCircuit className="w-3 h-3 text-purple-400"/> Primary Vector</span>
                    <span className="text-2xl font-bold text-white mt-2 block truncate block">{summary.role}</span>
                 </motion.div>
                 
                 <motion.div variants={itemVars} className="glass-panel p-8 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 flex items-center gap-2"><Activity className="w-3 h-3 text-emerald-400"/> Experience Bracket</span>
                    <span className="text-2xl font-bold text-white mt-2 block truncate">{summary.experience}</span>
                 </motion.div>
              </div>

              {/* Main Graph */}
              <motion.div variants={itemVars} className="glass-panel flex-1 p-8 lg:p-12 min-h-[450px] flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-500/5 pointer-events-none"></div>
                <h3 className="font-bold text-white/80 mb-8 flex items-center gap-2 relative z-10 text-sm tracking-wide">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div> Node Accuracy Distribution
                </h3>
                
                <div className="flex-1 w-full h-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} dy={10} />
                      <YAxis domain={[0, 10]} tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} dx={-10} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '5 5' }} />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#818cf8" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                        activeDot={{ r: 8, fill: '#818cf8', stroke: '#fff', strokeWidth: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

           </motion.div>
        )}
      </main>
    </div>
  );
}

export default Performance;
