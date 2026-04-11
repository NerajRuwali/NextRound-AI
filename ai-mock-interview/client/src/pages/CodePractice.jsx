import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PROBLEM_SET = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", acceptance: "50.4%", solved: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", category: "Linked List", acceptance: "41.2%", solved: true },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Sliding Window", acceptance: "34.1%", solved: false },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Binary Search", acceptance: "38.5%", solved: false },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", category: "Dynamic Programming", acceptance: "33.2%", solved: false },
  { id: 10, title: "Regular Expression Matching", difficulty: "Hard", category: "Dynamic Programming", acceptance: "28.3%", solved: false },
  { id: 11, title: "Container With Most Water", difficulty: "Medium", category: "Two Pointers", acceptance: "54.6%", solved: false },
];

function CodePractice() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="mb-10 lg:flex items-end justify-between">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">Code & Design Practice</h1>
            <p className="text-gray-300 dark:text-zinc-500">Sharpen your logic and system architecture skills with targeted problems.</p>
         </div>
         <div className="mt-4 lg:mt-0 font-mono text-sm px-4 py-2 bg-gray-500 dark:bg-yellow-400/10 border border-gray-500 dark:border-yellow-400/20 text-gray-300 dark:text-yellow-400 rounded-lg flex items-center gap-2 font-bold shadow-sm">
            <span>Streak</span>
            3 Day Streak
         </div>
       </div>

       {/* Control Bar */}
       <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search problems..." 
            className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 shadow-sm"
          />
          <div className="flex gap-2 shrink-0">
             <button className="px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-300 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 shadow-sm transition-colors text-sm font-medium">Difficulty</button>
             <button className="px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-300 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 shadow-sm transition-colors text-sm font-medium">Status</button>
          </div>
       </div>

       {/* Problems Table */}
       <div className="bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-colors">
         <table className="w-full text-left border-collapse">
           <thead>
             <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/80 text-gray-300 dark:text-zinc-500 text-xs uppercase tracking-widest font-bold">
               <th className="px-6 py-4 w-12">Status</th>
               <th className="px-6 py-4">Title</th>
               <th className="px-6 py-4 hidden sm:table-cell">Difficulty</th>
               <th className="px-6 py-4 hidden md:table-cell">Acceptance</th>
               <th className="px-6 py-4text-right">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
             {PROBLEM_SET.map((prob) => (
               <tr key={prob.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors group">
                 <td className="px-6 py-4">
                   {prob.solved ? (
                     <div className="w-5 h-5 rounded-full bg-yellow-400 dark:bg-yellow-400/20 text-yellow-400 dark:text-yellow-400 flex items-center justify-center">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                     </div>
                   ) : (
                     <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-zinc-700"></div>
                   )}
                 </td>
                 <td className="px-6 py-4">
                   <div className="font-bold text-gray-900 dark:text-zinc-200 text-sm md:text-base mb-1">{prob.id}. {prob.title}</div>
                   <div className="text-xs font-mono text-gray-300 dark:text-zinc-500">{prob.category}</div>
                 </td>
                 <td className="px-6 py-4 hidden sm:table-cell">
                   <span className={`text-xs font-bold uppercase tracking-widest ${prob.difficulty === 'Easy' ? 'text-yellow-400' : prob.difficulty === 'Medium' ? 'text-yellow-400' : 'text-yellow-400'}`}>
                     {prob.difficulty}
                   </span>
                 </td>
                 <td className="px-6 py-4 font-mono text-sm text-gray-300 dark:text-zinc-400 hidden md:table-cell">
                   {prob.acceptance}
                 </td>
                 <td className="px-6 py-4 text-right">
                   <button 
                     onClick={() => alert('Code practice IDE is a future premium feature.')}
                     className="px-4 py-2 bg-gray-500 dark:bg-zinc-800 border border-gray-500 dark:border-zinc-700 hover:border-gray-500 dark:hover:border-zinc-500 hover:bg-gray-500 dark:hover:bg-zinc-700 text-gray-300 dark:text-zinc-300 font-medium text-sm rounded-lg transition-all"
                   >
                     Solve
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </div>
  );
}

export default CodePractice;
