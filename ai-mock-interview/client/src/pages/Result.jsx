import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, interview } = location.state || {};

  if (!results) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors">
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const totalPossible = results.length * 10;
  const actualScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const percentage = Math.round((actualScore / totalPossible) * 100);

  let globalColor = "amber";
  if (percentage >= 80) globalColor = "emerald";
  else if (percentage < 50) globalColor = "rose";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 font-sans p-6 md:p-12 transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-in slide-in-from-bottom-4 duration-500">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mb-4 transition-colors">
                 Session Complete
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Performance Synthesis</h1>
              <p className="text-gray-500 dark:text-zinc-400 font-mono text-sm max-w-lg">
                 Target: <span className="text-indigo-600 dark:text-indigo-400">{interview.role}</span> // Bracket: <span className="text-amber-600 dark:text-amber-500">{interview.experience}</span>
              </p>
           </div>
           
           <div className="mt-8 md:mt-0 flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm dark:shadow-none transition-colors">
              <div className="flex flex-col text-right">
                 <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Global Score</span>
                 <span className="text-3xl font-bold font-mono">
                   {actualScore}<span className="text-lg text-gray-400 dark:text-zinc-600">/{totalPossible}</span>
                 </span>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-zinc-800"></div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                 <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      className="text-gray-100 dark:text-zinc-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`text-${globalColor}-500 transition-all duration-1000 ease-out`}
                      strokeDasharray={`${percentage}, 100`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                 </svg>
                 <span className="absolute text-sm font-bold">{percentage}%</span>
              </div>
           </div>
        </div>

        {/* Detailed Breakdown */}
        <h3 className="text-xl font-bold mb-6 tracking-tight border-b border-gray-200 dark:border-zinc-800 pb-2 transition-colors">Node-by-Node Analysis</h3>
        <div className="space-y-6">
          {results.map((res, index) => {
            let color = "amber";
            if (res.score >= 8) color = "emerald";
            else if (res.score < 5) color = "rose";

            return (
              <div 
                key={index} 
                className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm dark:shadow-none transition-colors group hover:border-gray-300 dark:hover:border-zinc-700"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
              >
                
                {/* Header */}
                <div className="bg-gray-50 dark:bg-zinc-900/80 p-5 px-6 flex items-start justify-between border-b border-gray-200 dark:border-zinc-800 transition-colors">
                   <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-2">
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 transition-colors">
                           Node {index + 1}
                         </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-zinc-100 leading-snug">{res.question}</h4>
                   </div>
                   
                   <div className={`shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border bg-white dark:bg-zinc-950 transition-colors ${
                      color === 'emerald' ? 'border-emerald-200 dark:border-emerald-500/30' : 
                      color === 'rose' ? 'border-rose-200 dark:border-rose-500/30' : 
                      'border-amber-200 dark:border-amber-500/30'
                   }`}>
                      <span className={`text-xl font-bold ${
                         color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 
                         color === 'rose' ? 'text-rose-600 dark:text-rose-400' : 
                         'text-amber-600 dark:text-amber-400'
                      }`}>
                         {res.score}
                      </span>
                   </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:flex divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-zinc-800 transition-colors">
                   
                   {/* Answer Pane */}
                   <div className="md:w-1/2 md:pr-6 pb-6 md:pb-0">
                      <h5 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold mb-3 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                         Candidate Submission
                      </h5>
                      <div className="bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm text-gray-600 dark:text-zinc-400 whitespace-pre-wrap transition-colors">
                         {res.answer}
                      </div>
                   </div>

                   {/* AI Feedback Pane */}
                   <div className="md:w-1/2 md:pl-6 pt-6 md:pt-0 flex flex-col justify-between">
                      <div>
                         <h5 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            AI Synthesis
                         </h5>
                         <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed mb-6">
                            {res.feedback}
                         </p>
                      </div>
                      
                      {res.suggestions?.length > 0 && (
                        <div className="mt-auto">
                           <h5 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold mb-3 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                              Actionable Improvements
                           </h5>
                           <ul className="space-y-2">
                              {res.suggestions.map((sug, i) => (
                                 <li key={i} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-2">
                                    <svg className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    <span className="leading-snug">{sug}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                      )}
                   </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex justify-center pb-12">
           <button 
             onClick={() => navigate('/dashboard')}
             className="px-8 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 hover:bg-gray-50 dark:hover:border-zinc-700 rounded-xl font-medium shadow-sm transition-all flex items-center gap-3 group"
           >
             <svg className="w-5 h-5 text-gray-400 dark:text-zinc-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Return to Dashboard Operations
           </button>
        </div>

      </div>
    </div>
  );
}

export default Result;