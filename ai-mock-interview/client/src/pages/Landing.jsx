import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Rocket, Target, Zap, ChevronRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          variants={containerVars} 
          initial="hidden" 
          animate="show" 
          className="flex flex-col items-center text-center mt-12 lg:mt-24"
        >
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(99,102,241,0.15)] text-indigo-300 font-medium text-sm">
            <Rocket className="w-4 h-4" /> NextRound AI Architecture V2 Now Live
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
            Crack Your Next Interview <br className="hidden md:block"/> With AI Precision
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg md:text-xl text-indigo-200/80 max-w-2xl mb-12 font-medium leading-relaxed">
            Stop practicing in the dark. Experience FAANG-level system design and algorithm mock interviews graded instantly by an advanced AI protocol.
          </motion.p>
          
          <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.6)" }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate("/login")}
               className="w-full sm:w-auto px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-colors"
             >
               Start Interview <ChevronRight className="w-5 h-5" />
             </motion.button>
             <motion.a 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               href="#features"
               className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm transition-colors"
             >
               View Features
             </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Code UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="mt-24 max-w-5xl mx-auto relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur-2xl opacity-20"></div>
          <div className="bg-[#0c1222]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl overflow-hidden relative">
             <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <div className="ml-4 flex gap-4 text-xs font-mono text-indigo-300/50">
                  <span className="text-indigo-300">Solution.jsx</span>
                  <span>Terminal</span>
                </div>
             </div>
             <div className="p-4 font-mono text-sm leading-relaxed text-indigo-200/70">
                <span className="text-purple-400">export function</span> <span className="text-blue-400">optimizeAlgorithm</span>(data) {'{'}
                <br/>
                &nbsp;&nbsp;<span className="text-slate-500">// Your elegant approach here</span>
                <br/>
                &nbsp;&nbsp;<span className="text-purple-400">const</span> cache = <span className="text-purple-400">new</span> Map();
                <br/>
                &nbsp;&nbsp;<span className="text-purple-400">return</span> data.<span className="text-blue-400">reduce</span>((acc, curr) =&gt; {'{'} ... {'}'}, <span className="text-amber-400">[]</span>);
                <br/>
                {'}'}
             </div>
             {/* Fake Tooltip */}
             <div className="absolute right-8 bottom-8 bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xl border border-indigo-400 flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" /> Perfect Time Complexity O(N)
             </div>
          </div>
        </motion.div>

        {/* Features Highlights */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-8">
           
           <motion.div whileHover={{ y: -8 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
               <Bot className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Dynamic AI Questions</h3>
             <p className="text-indigo-200/70 leading-relaxed font-medium text-sm">Targeted algorithmic and system design questions mapping directly to your specified FAANG role and seniority.</p>
           </motion.div>

           <motion.div whileHover={{ y: -8 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
               <Zap className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Instant Feedback</h3>
             <p className="text-indigo-200/70 leading-relaxed font-medium text-sm">Don't wait for humans to review code manually. Get instant scores, optimization flags, and exact architecture breakdowns.</p>
           </motion.div>

           <motion.div whileHover={{ y: -8 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
               <Target className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Performance Tracking</h3>
             <p className="text-indigo-200/70 leading-relaxed font-medium text-sm">Analyze your algorithm accuracy plotted over time inside a completely automated Recharts historical dashboard.</p>
           </motion.div>

        </div>

      </main>
    </div>
  );
}
