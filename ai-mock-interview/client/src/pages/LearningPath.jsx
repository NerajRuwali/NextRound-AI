import { useState } from "react";

const ROADMAP_MODULES = [
  { id: 1, title: "Module 1: Language Fundamentals & Arrays", status: "completed", duration: "Week 1", desc: "Master basic syntax, loops, and core array manipulation." },
  { id: 2, title: "Module 2: Two Pointers & Sliding Window", status: "in-progress", duration: "Week 2", desc: "Learn essential pattern recognition for substring and contiguous slice problems." },
  { id: 3, title: "Module 3: Linked Lists & Recursion", status: "locked", duration: "Week 3", desc: "Understand pointer manipulation and call stack fundamentals." },
  { id: 4, title: "Module 4: Trees & Graphs", status: "locked", duration: "Week 4-5", desc: "Deep dive into BFS, DFS, Dijkstra, and structural traversal." },
  { id: 5, title: "Module 5: Dynamic Programming Fundamentals", status: "locked", duration: "Week 6-7", desc: "Transition from memoization to tabulation for optimal substructures." },
  { id: 6, title: "Module 6: System Design Basics", status: "locked", duration: "Week 8", desc: "Scalability, load balancing, caching, and database sharding." },
  { id: 7, title: "Module 7: Mock Interview Gauntlet", status: "locked", duration: "Week 9", desc: "Intense daily AI mock interviews covering all previous modules." },
];

function LearningPath() {
  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="mb-10 lg:flex items-end justify-between border-b border-gray-200 dark:border-zinc-800 pb-6 transition-colors">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">Structured Learning Path</h1>
            <p className="text-gray-300 dark:text-zinc-500">A comprehensive 90-day roadmap from fundamentals to FAANG-ready.</p>
         </div>
         <div className="mt-4 lg:mt-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm transition-colors text-sm">
            <span className="text-gray-300 dark:text-zinc-500 font-medium">Path Progress:</span>
            <span className="ml-2 font-bold text-yellow-400 dark:text-yellow-400">14%</span>
         </div>
       </div>

       <div className="max-w-3xl mx-auto w-full py-4 relative">
          
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[39px] w-0.5 bg-gray-200 dark:bg-zinc-800 transition-colors"></div>

          <div className="space-y-12">
             {ROADMAP_MODULES.map((mod, index) => (
                <div key={mod.id} className="relative pl-12 md:pl-20 group">
                   
                   {/* Status Node */}
                   <div className={`absolute left-[7px] md:left-[23px] top-1 w-8 h-8 rounded-full border-4 border-gray-50 dark:border-zinc-950 flex items-center justify-center transition-colors z-10 ${
                      mod.status === 'completed' ? 'bg-yellow-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                      mod.status === 'in-progress' ? 'bg-yellow-400 shadow-[0_0_15px_rgba(79,70,229,0.4)] animate-pulse' : 
                      'bg-gray-200 dark:bg-zinc-800'
                   }`}>
                      {mod.status === 'completed' && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                      {mod.status === 'in-progress' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                   </div>

                   {/* Content Box */}
                   <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${
                      mod.status === 'completed' ? 'bg-white dark:bg-zinc-900/50 border-yellow-400 dark:border-yellow-400/30' :
                      mod.status === 'in-progress' ? 'bg-white dark:bg-zinc-900 border-gray-500 dark:border-yellow-400/50 -translate-y-1 shadow-md' :
                      'bg-gray-50 dark:bg-zinc-900/20 border-gray-200 dark:border-zinc-800 opacity-70'
                   }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                         <h3 className={`font-bold text-lg ${mod.status === 'locked' ? 'text-gray-300 dark:text-zinc-500' : 'text-gray-900 dark:text-zinc-100'}`}>
                            {mod.title}
                         </h3>
                         <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-mono font-bold rounded-lg shrink-0 transition-colors">
                            {mod.duration}
                         </span>
                      </div>
                      <p className={`text-sm leading-relaxed mb-6 ${mod.status === 'locked' ? 'text-gray-300 dark:text-zinc-600' : 'text-gray-600 dark:text-zinc-400'}`}>
                         {mod.desc}
                      </p>
                      
                      {mod.status === 'in-progress' ? (
                         <button className="px-6 py-2 bg-yellow-400 hover:bg-gray-500 text-black font-bold font-medium text-sm rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-colors flex items-center gap-2">
                           Continue Learning
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                         </button>
                      ) : mod.status === 'completed' ? (
                         <button className="px-4 py-1.5 bg-yellow-400 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-400/20 font-medium text-xs rounded transition-colors">
                           Review Module
                         </button>
                      ) : (
                         <button disabled className="px-4 py-1.5 bg-gray-200 dark:bg-zinc-800 text-gray-300 dark:text-zinc-500 font-medium text-xs rounded flex items-center gap-2 cursor-not-allowed transition-colors">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                           Locked
                         </button>
                      )}
                   </div>

                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

export default LearningPath;
