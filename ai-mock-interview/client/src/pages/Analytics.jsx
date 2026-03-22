import { useState, useEffect } from "react";
import axios from "axios";

function Analytics() {
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
           setHistory(response.data.history || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-gray-500 dark:text-zinc-500 text-center py-20 animate-pulse font-mono text-sm tracking-widest uppercase">Fetching System Telemetry...</div>;

  const totalInterviews = history.length;
  const totalQuestions = history.reduce((acc, curr) => acc + (curr.answers?.length || 0), 0);
  
  let totalScore = 0;
  let scoreCount = 0;
  history.forEach(session => {
    if (session.answers) {
      session.answers.forEach(ans => {
        totalScore += (ans.score || 0);
        scoreCount++;
      });
    }
  });
  
  const avgScore = scoreCount > 0 ? (totalScore / scoreCount).toFixed(1) : 0;

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-8 tracking-tight">Performance Analytics</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors">
             <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest block mb-2">Total Mock Sessions</span>
             <span className="text-4xl font-bold text-gray-900 dark:text-zinc-100">{totalInterviews}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors">
             <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest block mb-2">Nodes Evaluated</span>
             <span className="text-4xl font-bold text-gray-900 dark:text-zinc-100">{totalQuestions}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
             <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 opacity-20 dark:opacity-50 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest block mb-2">Global Avg. Score</span>
             <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{avgScore}<span className="text-lg text-gray-400 dark:text-zinc-600">/10</span></span>
          </div>
       </div>

       {totalInterviews === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-200 dark:border-zinc-800 border-dashed mt-8 transition-colors">
             <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-zinc-600 mb-4 shadow-sm dark:shadow-inner transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 20V4"/></svg>
             </div>
             <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-300 mb-2">No Analytics Available</h3>
             <p className="text-gray-500 dark:text-zinc-500 max-w-sm">Take a practice AI interview from the dashboard to populate your telemetry module.</p>
          </div>
       ) : (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2 transition-colors">Recent Session History</h3>
            <div className="space-y-4">
               {history.slice(0, 5).map(session => (
                 <div key={session._id} className="bg-white dark:bg-zinc-900/50 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors border border-gray-200 dark:border-zinc-800 p-5 rounded-xl flex items-center justify-between shadow-sm cursor-pointer group">
                    <div>
                      <div className="font-bold text-gray-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                         {session.role} <span className="text-gray-400 dark:text-zinc-500 text-sm font-normal ml-2">({session.experience})</span>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-zinc-500 mt-1 uppercase tracking-widest">{new Date(session.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 block mb-1">Total Score</span>
                       <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {session.answers?.reduce((acc, curr) => acc + curr.score, 0) || 0}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
       )}
    </div>
  );
}
export default Analytics;
