import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, BrainCircuit, X, Check, Copy, ChevronRight, Activity, FileText } from "lucide-react";
import axios from "axios";

function PricingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
       {isOpen && (
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
         >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#0f172a] border border-white/20 w-full max-w-4xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 rounded-full p-2 transition-colors z-10">
               <X className="w-5 h-5" />
            </button>

            <div className="p-10 text-center relative">
                <div className="absolute top-[-50%] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-[80px] pointer-events-none"></div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight relative z-10">Level up your interview prep.</h2>
                <p className="text-gray-300/80 max-w-xl mx-auto text-lg relative z-10">Get unlimited access to AI Coach, real-time code execution, and curated FAANG design mocks.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 px-8 md:px-12 pb-12 relative z-10">
               {/* Free Tier */}
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col transition-colors backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                     <span className="text-5xl font-black text-white">$0</span>
                     <span className="text-white/50 font-medium">/ forever</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1 text-sm text-white/80 font-medium">
                     <li className="flex items-center gap-3"><div className="p-1 bg-yellow-400/20 rounded-full text-yellow-400"><Check className="w-3 h-3" /></div> 5 Mock Interviews / month</li>
                     <li className="flex items-center gap-3"><div className="p-1 bg-yellow-400/20 rounded-full text-yellow-400"><Check className="w-3 h-3" /></div> Basic DSA Pattern Maps</li>
                     <li className="flex items-center gap-3 opacity-40"><div className="p-1 bg-white/10 rounded-full text-white/50"><X className="w-3 h-3" /></div> No System Design Mocks</li>
                  </ul>
                  <button disabled className="w-full py-4 rounded-xl bg-white/10 text-white/50 font-bold transition-colors">Current Plan</button>
               </div>

               {/* Pro Tier */}
               <div className="bg-gradient-to-b from-yellow-400/20 to-yellow-400/10 border-2 border-yellow-400/50 rounded-3xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                  <div className="absolute -top-3 right-8 bg-black border border-yellow-400 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">Most Popular</div>
                  <h3 className="text-xl font-bold text-gray-300 mb-2">NextRound Pro</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                     <span className="text-5xl font-black text-white">$15</span>
                     <span className="text-white/50 font-medium">/ month</span>
                  </div>
                  <div className="text-xs text-yellow-400 font-bold mb-6 flex items-center gap-1.5 bg-yellow-400/10 w-fit px-3 py-1.5 rounded-full border border-yellow-400/20">
                     $12.75/mo with code NEXTROUND15
                  </div>
                  <ul className="space-y-4 mb-8 flex-1 text-sm text-white/90 font-medium">
                     <li className="flex items-center gap-3"><div className="p-1 bg-yellow-400/20 rounded-full text-yellow-400"><Check className="w-3 h-3" /></div> Unlimited Mock Interviews</li>
                     <li className="flex items-center gap-3"><div className="p-1 bg-yellow-400/20 rounded-full text-yellow-400"><Check className="w-3 h-3" /></div> Full System Design Tracks</li>
                     <li className="flex items-center gap-3"><div className="p-1 bg-yellow-400/20 rounded-full text-yellow-400"><Check className="w-3 h-3" /></div> Unlimited AI Coach</li>
                  </ul>
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                       alert("Redirecting to Checkout...");
                       onClose();
                    }}
                    className="w-full py-4 rounded-xl bg-yellow-400 text-black font-bold font-bold text-base transition-colors"
                  >
                    Upgrade to Pro
                  </motion.button>
               </div>
            </div>
          </motion.div>
         </motion.div>
       )}
    </AnimatePresence>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fake loading sequence to render Skeletons initially
  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("NEXTROUND15");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleStartInterview = async (e) => {
    e.preventDefault();
    if (!role.trim() || !experience.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/generate`,
        { role, experience },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/interview", {
        state: {
          interview: {
            _id: response.data._id || "temp-id",
            questions: response.data.questions || [],
            role,
            experience,
          },
        },
      });
     } catch (error) {
        // silent fetch discard
     } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (initialLoad) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-white/10 rounded-xl w-full max-w-2xl mx-auto mb-10"></div>
        <div className="flex flex-col xl:flex-row gap-16 mb-20">
           <div className="flex-1 space-y-6">
              <div className="h-16 bg-white/10 rounded-xl w-3/4"></div>
              <div className="h-16 bg-white/10 rounded-xl w-2/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/4 mt-8"></div>
           </div>
           <div className="flex-1 h-64 bg-white/10 rounded-2xl"></div>
        </div>
        <div className="h-32 bg-white/10 rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show">
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />

      {/* Promo Bar */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            className="relative bg-gradient-to-r from-yellow-400/20 to-yellow-400/20 backdrop-blur-md border border-yellow-400/30 text-yellow-400 text-xs md:text-sm font-medium py-3 px-10 flex justify-center items-center gap-4 shadow-xl mb-12 rounded-2xl overflow-hidden"
          >
            <span className="flex items-center flex-wrap justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Limited time — 15% off all plans! Use code</span>
              <button 
                onClick={handleCopyCode}
                title="Copy to clipboard"
                className="bg-yellow-400/50 hover:bg-yellow-400/80 px-3 py-1 rounded-full border border-yellow-400/40 transition-colors cursor-pointer inline-flex items-center gap-1.5 ml-1"
              >
                <strong className="tracking-wider text-white">NEXTROUND15</strong>
                {copiedCode ? <Check className="w-3 h-3 text-yellow-400" /> : <Copy className="w-3 h-3 text-yellow-400" />}
              </button>
            </span>
            <button onClick={() => setShowPricing(true)} className="bg-white hover:bg-yellow-400 text-yellow-400 px-4 py-1.5 rounded-full shadow-sm text-xs font-bold transition-colors hidden sm:inline-block">See plans →</button>
            <button onClick={() => setShowPromo(false)} className="absolute right-3 p-1.5 hover:bg-white/10 rounded-full transition-colors text-yellow-400/50 hover:text-white"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Block */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-16 mb-20 relative">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-400/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <motion.div variants={itemVars} className="w-full xl:w-1/2 flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
            <BrainCircuit className="w-4 h-4" /> Next-Gen AI System
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-sans text-white leading-[1.1] mb-6 tracking-tight">
            <span className="text-yellow-400">AI</span> expertly trained<br />to get you<br /><span className="text-yellow-400">interview-ready</span>
          </h1>
          <p className="text-lg text-gray-300/70 mb-10 font-medium max-w-lg">
            Master Data Structures, Algorithms, and System Design with instantaneous, FAANG-level feedback.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-black font-bold font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-3 text-lg group"
          >
            <Code2 className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            Start Interview Now
          </motion.button>
        </motion.div>

        <motion.div variants={itemVars} className="w-full xl:w-1/2 relative z-10 hidden md:block">
          <div className="glass-panel w-full aspect-[4/3] flex flex-col group overflow-hidden relative">
            <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 backdrop-blur-md">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              </div>
              <div className="ml-4 px-3 py-1 bg-black/30 rounded border border-white/5 text-[10px] text-white/50 font-mono">
                solution.ts
              </div>
            </div>
            <div className="flex-1 p-6 font-mono text-sm leading-relaxed text-gray-300/70 relative bg-black/20">
                <span className="text-yellow-400">function</span> <span className="text-yellow-400">binarySearch</span>(arr: <span className="text-yellow-400">number[]</span>, target: <span className="text-yellow-400">number</span>): <span className="text-yellow-400">number</span> {'{'}
                <br/>
                &nbsp;&nbsp;<span className="text-white/40">// Auto-evaluated by AI Coordinator</span>
                <br/>
                &nbsp;&nbsp;<span className="text-yellow-400">let</span> left = <span className="text-yellow-400">0</span>;
                <br/>
                &nbsp;&nbsp;<span className="text-yellow-400">let</span> right = arr.<span className="text-yellow-400">length</span> - <span className="text-yellow-400">1</span>;
                <div className="mt-4 flex gap-2">
                  <div className="h-2 w-32 bg-white/10 rounded"></div>
                  <div className="h-2 w-16 bg-white/10 rounded"></div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVars} className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-white/20 transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Resume-Based Mocks</h2>
              <span className="px-2 py-0.5 bg-yellow-400/20 text-gray-300 text-xs font-bold rounded-full border border-yellow-400/30 uppercase tracking-widest">Beta</span>
            </div>
            <p className="text-gray-300/70 text-sm md:text-base">Practice with deep-dive questions strictly tailored to your resume.</p>
          </div>
          <button onClick={() => navigate('/resume-analyzer')} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-full shrink-0 transition-all flex items-center gap-2 whitespace-nowrap">
            Start Parsing <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div variants={itemVars} className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-white/20 transition-colors">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/30">
                 <Activity className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-white">View Performance</h3>
                 <p className="text-gray-300/70 text-sm">Review your automated algorithmic scores in the realtime timeline graph.</p>
              </div>
           </div>
           <button onClick={() => navigate('/performance')} className="px-6 py-2.5 shrink-0 bg-white text-gray-300 border border-transparent hover:bg-gray-500 font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all whitespace-nowrap">
              Analytics <ChevronRight className="w-4 h-4 inline" />
           </button>
        </motion.div>
      </div>

      {/* Start Interview Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0f172a] border border-white/20 w-full max-w-lg rounded-[2rem] shadow-2xl p-8 relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 rounded-full p-2 transition-colors">
                 <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Session Configuration</h2>
              <p className="text-sm text-gray-300/70 mb-8 pb-6 border-b border-white/10">Provide targeted details to ensure accurate AI evaluation.</p>

              <form onSubmit={handleStartInterview} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-wide">Target Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-wide">Experience Context</label>
                  <select
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all font-medium [&>option]:bg-gray-900"
                  >
                    <option value="" disabled className="text-white/30">Select experience tier</option>
                    <option value="Internship">Internship Level</option>
                    <option value="Junior">Junior (0-2 years)</option>
                    <option value="Mid-Level">Mid-Level (2-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                    <option value="Lead/Manager">Lead / Managerial</option>
                  </select>
                </div>

                <div className="pt-4 mt-8 border-t border-white/10">
                   <button
                     type="submit"
                     disabled={loading || !role || !experience}
                     className={`w-full py-4 px-6 bg-yellow-400 hover:bg-yellow-400 text-black font-bold font-bold rounded-xl flex items-center justify-center gap-3 transition-all ${
                       (loading || !role || !experience) ? "opacity-50 cursor-not-allowed" : "shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                     }`}
                   >
                     {loading ? (
                       <span className="flex items-center gap-2">
                         <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         Initializing Architecture...
                       </span>
                     ) : (
                       <span className="flex items-center gap-2">
                         Initialize Protocol <ChevronRight className="w-4 h-4" />
                       </span>
                     )}
                   </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}