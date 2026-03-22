import React from "react";

const PATTERNS = [
  { id: 1, name: "Sliding Window", progress: 100, color: "emerald", questions: 12 },
  { id: 2, name: "Two Pointers", progress: 85, color: "indigo", questions: 15 },
  { id: 3, name: "Fast & Slow Pointers", progress: 40, color: "blue", questions: 8 },
  { id: 4, name: "Merge Intervals", progress: 0, color: "zinc", questions: 6 },
  { id: 5, name: "Cyclic Sort", progress: 0, color: "zinc", questions: 5 },
  { id: 6, name: "In-place Reversal of a LinkedList", progress: 0, color: "zinc", questions: 7 },
  { id: 7, name: "Tree Breadth First Search", progress: 10, color: "amber", questions: 14 },
  { id: 8, name: "Tree Depth First Search", progress: 0, color: "zinc", questions: 12 },
  { id: 9, name: "Two Heaps", progress: 0, color: "zinc", questions: 4 },
];

function LearnDSA() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Structured Course
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">DSA Pattern Mastery</h1>
          <p className="text-gray-500 dark:text-zinc-400 max-w-xl">
            Master the top algorithmic patterns to easily solve any coding interview question without memorization.
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl flex items-center gap-6 shrink-0 shadow-sm dark:shadow-none transition-colors">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mb-1">Overall</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100 flex items-baseline gap-1">26<span className="text-sm text-gray-500 dark:text-zinc-500">%</span></span>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mb-1">Patterns</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100 flex items-baseline gap-1">2<span className="text-sm text-gray-500 dark:text-zinc-500">/15</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATTERNS.map((pattern) => {
          const isComplete = pattern.progress === 100;
          const isStarted = pattern.progress > 0;
          
          return (
            <div 
              key={pattern.id}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer shadow-sm dark:shadow-none ${
                isComplete 
                  ? "bg-white dark:bg-zinc-900/50 border-emerald-300 dark:border-emerald-500/30 hover:bg-gray-50 dark:hover:bg-zinc-900/80 hover:border-emerald-400 dark:hover:border-emerald-500/50" 
                  : isStarted 
                    ? "bg-white dark:bg-zinc-900/40 border-indigo-300 dark:border-indigo-500/30 hover:bg-gray-50 dark:hover:bg-zinc-900/70 hover:border-indigo-400 dark:hover:border-indigo-500/50"
                    : "bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900/30"
              }`}
            >
              {isComplete && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)] text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                  isComplete 
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                    : isStarted 
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20"
                      : "bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-zinc-600 border-gray-200 dark:border-zinc-800"
                }`}>
                  {pattern.id}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isComplete || isStarted ? 'text-gray-900 dark:text-zinc-100' : 'text-gray-600 dark:text-zinc-400'}`}>{pattern.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono">{pattern.questions} Questions</p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span className={isComplete ? "text-emerald-600 dark:text-emerald-500" : isStarted ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-zinc-600"}>
                    {isComplete ? "Mastered" : isStarted ? "In Progress" : "Not Started"}
                  </span>
                  <span className="text-gray-500 dark:text-zinc-500 font-mono">{pattern.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isComplete ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    }`}
                    style={{ width: `${pattern.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LearnDSA;
