import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, Download, Share2, CheckCircle2, Lock, ShieldCheck, ChevronRight } from "lucide-react";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: "cert-01",
      title: "FAANG System Design Architecture",
      issuer: "NextRound AI Engine",
      date: "March 2026",
      status: "unlocked",
      tier: "gold",
      score: "98/100",
      description: "Awarded for exceptional mastery in distributed systems, load balancing, and scalable data partitioning during the Senior Engineering Mock phase."
    },
    {
      id: "cert-02",
      title: "Advanced DSA Pattern Recognition",
      issuer: "NextRound AI Engine",
      date: "February 2026",
      status: "unlocked",
      tier: "silver",
      score: "92/100",
      description: "Awarded for perfect execution of dynamic programming, sliding window, and graph traversal constraints within strict time complexities."
    },
    {
      id: "cert-03",
      title: "Principal Engineering Matrix",
      issuer: "NextRound AI Engine",
      date: "Pending",
      status: "locked",
      tier: "platinum",
      score: "N/A",
      description: "Locked. Requires averaging 95+ across 10 uninterrupted Lead-level architectural evaluations."
    }
  ];

  const getTierStyles = (tier, status) => {
     if (status === "locked") return "border-white/10 from-gray-900 to-black text-gray-300 shadow-none";
     switch (tier) {
       case "gold": return "border-yellow-400/30 from-yellow-400/10 via-yellow-400/5 to-[#0f172a] shadow-[0_0_40px_rgba(251,191,36,0.15)]";
       case "silver": return "border-yellow-400/30 from-yellow-400/10 via-yellow-400/5 to-[#0f172a] shadow-[0_0_40px_rgba(96,165,250,0.15)]";
       case "platinum": return "border-fuchsia-400/30 from-fuchsia-500/10 via-fuchsia-700/5 to-[#0f172a] shadow-[0_0_40px_rgba(232,121,249,0.15)]";
       default: return "border-white/10 from-white/5 to-[#0f172a]";
     }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-3 flex items-center gap-3">
          <Award className="w-8 h-8 text-yellow-400" /> Digital Credentials
        </h1>
        <p className="text-gray-300/60 font-medium max-w-xl text-sm leading-relaxed">
          Your indisputable, AI-verified proof of architectural and algorithmic mastery. Display these tokens to recruiters to bypass standard screening walls.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {certificates.map((cert) => (
          <motion.div 
            key={cert.id}
            variants={itemVars}
            whileHover={cert.status === "unlocked" ? { y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300 } } : {}}
            onClick={() => cert.status === "unlocked" && setSelectedCert(cert)}
            className={`relative p-[1px] rounded-3xl overflow-hidden cursor-pointer ${cert.status === "locked" ? "cursor-not-allowed opacity-60" : "group"}`}
          >
             {/* Animated Border Gradient Wrapper */}
             {cert.status === "unlocked" && (
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite] transition-all duration-1000"></div>
             )}
             
             {/* Actual Card Body */}
             <div className={`h-full bg-gradient-to-br backdrop-blur-xl border rounded-[23px] p-8 flex flex-col relative overflow-hidden transition-all duration-500 ${getTierStyles(cert.tier, cert.status)}`}>
                
                {/* Watermark Background Element */}
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
                   <ShieldCheck className="w-64 h-64" />
                </div>

                <div className="flex justify-between items-start mb-6">
                   <div className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border flex items-center gap-1.5 ${
                      cert.status === "unlocked" ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20" : "bg-black/40 text-gray-300 border-white/10"
                   }`}>
                      {cert.status === "unlocked" ? <CheckCircle2 className="w-3 h-3"/> : <Lock className="w-3 h-3"/>}
                      {cert.status}
                   </div>
                   <div className="text-xs font-mono text-white/30">{cert.id}</div>
                </div>

                <h3 className="text-2xl font-bold mb-2 leading-tight text-white">{cert.title}</h3>
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6">{cert.issuer}</p>

                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end relative z-10">
                   <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Issue Date</div>
                      <div className="text-sm font-medium text-white/80">{cert.date}</div>
                   </div>
                   {cert.status === "unlocked" && (
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                     </div>
                   )}
                </div>

             </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
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
               className={`w-full max-w-2xl bg-gradient-to-br backdrop-blur-2xl border rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden ${getTierStyles(selectedCert.tier, "unlocked")}`}
            >
               <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10 z-20"
               >
                  ✕
               </button>

               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.02] transform rotate-12 pointer-events-none -mt-32 -mr-32">
                 <ShieldCheck className="w-full h-full" />
               </div>

               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 border border-white/10 text-xs font-mono text-white/50 mb-8 uppercase tracking-widest">
                     Verified Authenticity Hologram • ID: {selectedCert.id} 
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                     {selectedCert.title}
                  </h2>
                  <p className="text-lg text-white/60 font-medium mb-8 max-w-lg leading-relaxed">
                     {selectedCert.description}
                  </p>

                  <div className="flex gap-12 border-y border-white/10 py-6 mb-10 w-full justify-center">
                     <div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Evaluation Score</div>
                        <div className="text-3xl font-mono font-bold text-white">{selectedCert.score}</div>
                     </div>
                     <div className="w-px bg-white/10"></div>
                     <div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Issue Date</div>
                        <div className="text-2xl font-medium text-white/90 mt-1">{selectedCert.date}</div>
                     </div>
                  </div>

                  <div className="flex gap-4 w-full justify-center">
                     <button className="px-8 py-3.5 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                        <Download className="w-4 h-4" /> Download PDF
                     </button>
                     <button className="px-8 py-3.5 bg-black/40 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-black/60 transition-colors">
                        <Share2 className="w-4 h-4" /> Share on LinkedIn
                     </button>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
