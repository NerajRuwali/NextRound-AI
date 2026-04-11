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
    <div 
      className="min-h-screen text-white font-sans selection:bg-yellow-500/30 bg-black"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url('/ai-face.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Split Layout Hero Section */}
        <motion.div 
          variants={containerVars} 
          initial="hidden" 
          animate="show" 
          className="flex flex-col lg:flex-row items-center mt-12 lg:mt-24 min-h-[60vh]"
        >
          {/* Left Side -> Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-10">
            <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400 mb-8 max-w-max shadow-[0_0_15px_rgba(255,204,0,0.15)] bg-black/40 backdrop-blur-md">
              <span className="text-yellow-400 font-bold text-xs tracking-wider uppercase">AI-POWERED INTERVIEWS</span>
            </motion.div>
            
            <motion.h1 variants={itemVars} className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] max-w-3xl">
              Crack Your Next <br className="hidden md:block"/>
              <span className="text-yellow-400" style={{ textShadow: "0 0 20px rgba(255, 204, 0, 0.3)" }}>Interview</span> With <span className="text-yellow-400" style={{ textShadow: "0 0 20px rgba(255, 204, 0, 0.3)" }}>AI</span> Precision
            </motion.h1>
            
            <motion.p variants={itemVars} className="text-lg md:text-xl text-gray-300 max-w-xl mb-12 font-medium leading-relaxed">
              Stop practicing in the dark. Experience FAANG-level system design and algorithm mock interviews graded instantly by an advanced AI protocol.
            </motion.p>
            
            <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => navigate("/login")}
                 className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
               >
                 Start Interview <ChevronRight className="w-5 h-5" />
               </motion.button>
               <motion.a 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 href="#features"
                 className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-bold rounded-full border border-white/20 transition-colors flex items-center justify-center text-center"
               >
                 View Features
               </motion.a>
            </motion.div>
          </div>
          
          {/* Right Side -> Transparent to let background image be visible */}
          <div className="w-full lg:w-1/2 flex justify-end items-center relative min-h-[40vh] lg:min-h-[auto]">
          </div>
        </motion.div>

        {/* Floating Code UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="mt-24 max-w-5xl mx-auto relative hidden lg:block"
        >
          <div className="absolute -inset-1 bg-yellow-400/10 rounded-[2rem] blur-2xl opacity-20"></div>
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl overflow-hidden relative">
             <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 flex gap-4 text-xs font-mono text-gray-300">
                  <span className="text-gray-300">Solution.jsx</span>
                  <span>Terminal</span>
                </div>
             </div>
             <div className="p-4 font-mono text-sm leading-relaxed text-gray-300">
                <span className="text-yellow-400">export function</span> <span className="text-yellow-400">optimizeAlgorithm</span>(data) {'{'}
                <br/>
                &nbsp;&nbsp;<span className="text-gray-300">// Your elegant approach here</span>
                <br/>
                &nbsp;&nbsp;<span className="text-yellow-400">const</span> cache = <span className="text-yellow-400">new</span> Map();
                <br/>
                &nbsp;&nbsp;<span className="text-yellow-400">return</span> data.<span className="text-yellow-400">reduce</span>((acc, curr) =&gt; {'{'} ... {'}'}, <span className="text-gray-300">[]</span>);
                <br/>
                {'}'}
             </div>
             {/* Fake Tooltip */}
             <div className="absolute right-8 bottom-8 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-lg shadow-xl border border-yellow-500 flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" /> Perfect Time Complexity O(N)
             </div>
          </div>
        </motion.div>

        {/* Features Highlights */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-8">
           
           <motion.div whileHover={{ y: -8 }} className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
               <Bot className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Dynamic AI Questions</h3>
             <p className="text-gray-300 leading-relaxed font-medium text-sm">Targeted algorithmic and system design questions mapping directly to your specified FAANG role and seniority.</p>
           </motion.div>

           <motion.div whileHover={{ y: -8 }} className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
               <Zap className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Instant Feedback</h3>
             <p className="text-gray-300 leading-relaxed font-medium text-sm">Don't wait for humans to review code manually. Get instant scores, optimization flags, and exact architecture breakdowns.</p>
           </motion.div>

           <motion.div whileHover={{ y: -8 }} className="bg-black/40 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl">
             <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
               <Target className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-white">Performance Tracking</h3>
             <p className="text-gray-300 leading-relaxed font-medium text-sm">Analyze your algorithm accuracy plotted over time inside a completely automated Recharts historical dashboard.</p>
           </motion.div>

        </div>

      </main>
    </div>
  );
}
