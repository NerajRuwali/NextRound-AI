import { useState, useEffect } from "react";
import axios from "axios";

function RevisionHub() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/interview/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
           // mock logic
        }
        setHistory(response.data.history || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-gray-500 dark:text-zinc-500 text-center py-20 animate-pulse font-mono text-sm tracking-widest uppercase">Fetching Historical Data...</div>;

  const allAnswers = [];
  history.forEach(session => {
     if(session.answers) {
        session.answers.forEach(ans => {
           allAnswers.push({
              ...ans,
              sessionId: session._id,
              role: session.role
           });
        });
     }
  });

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="mb-10 lg:flex items-end justify-between">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">Revision Hub</h1>
            <p className="text-gray-500 dark:text-zinc-500">Review past questions, your responses, and system feedback to identify growth areas.</p>
         </div>
         <div className="mt-4 lg:mt-0 font-mono text-sm text-gray-500 dark:text-zinc-500 px-3 py-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded uppercase tracking-widest shadow-sm dark:shadow-none transition-colors">
            {allAnswers.length} Nodes Indexed
         </div>
       </div>

       {allAnswers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-200 dark:border-zinc-800 border-dashed text-center mt-6 transition-colors">
             <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shadow-inner mb-6 transition-colors">
                 <span className="text-3xl">🗃️</span>
             </div>
             <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-200 mb-2">Repository Empty</h3>
             <p className="text-gray-500 dark:text-zinc-500 max-w-sm">No historical responses detected. Take a mock interview to establish baseline data.</p>
          </div>
       ) : (
          <div className="space-y-6">
             {allAnswers.map((item, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
                   <div className="p-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/80 flex items-start justify-between gap-4 transition-colors">
                      <div>
                         <span className="inline-block px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] uppercase font-bold tracking-widest mb-3 border border-amber-200 dark:border-amber-500/20">
                            {item.role}
                         </span>
                         <h4 className="font-bold text-lg text-gray-900 dark:text-zinc-100 leading-snug">{item.question}</h4>
                      </div>
                      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm dark:shadow-inner transition-colors">
                         <span className={`font-bold text-lg ${item.score >= 8 ? 'text-emerald-500 dark:text-emerald-400' : item.score < 5 ? 'text-rose-500 dark:text-rose-400' : 'text-amber-500 dark:text-amber-400'}`}>
                            {item.score}
                         </span>
                      </div>
                   </div>
                   
                   <div className="p-5 lg:flex gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-zinc-800 transition-colors">
                      <div className="lg:w-1/2 pb-4 lg:pb-0 lg:pr-6">
                         <h5 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold mb-3 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                           Your Answer Extract
                         </h5>
                         <p className="text-gray-700 dark:text-zinc-300 font-mono text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-4">
                            "{item.answer}"
                         </p>
                      </div>
                      <div className="lg:w-1/2 pt-4 lg:pt-0 lg:pl-6">
                         <h5 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold mb-3 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                           AI Synthesis
                         </h5>
                         <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed overflow-hidden text-ellipsis line-clamp-4">
                            {item.feedback}
                         </p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
}

export default RevisionHub;
