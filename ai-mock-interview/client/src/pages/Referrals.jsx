import { useState } from "react";

const REFERRAL_HISTORY = [
  { id: 1, email: "j...n@example.com", date: "Oct 12, 2026", status: "Joined", reward: "+50 Credits" },
  { id: 2, email: "s...a@gmail.com", date: "Oct 10, 2026", status: "Invited", reward: "Pending" },
  { id: 3, email: "m...k@company.io", date: "Oct 01, 2026", status: "Joined", reward: "+50 Credits" }
];

function Referrals() {
  const [copied, setCopied] = useState(false);
  const inviteCode = "NEXTROUND-8F92A";
  const inviteLink = `https://nextround.ai/join/${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="mb-10 border-b border-gray-200 dark:border-zinc-800 pb-6 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">Refer & Earn</h1>
          <p className="text-gray-300 dark:text-zinc-500">Invite friends to practice. You both get 50 premium mock interview credits when they join.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Main Referral Card */}
          <div className="lg:col-span-2 bg-black border border-yellow-400 text-yellow-400 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[40px] pointer-events-none"></div>
             
             <h2 className="text-2xl font-bold mb-2">Give 50, Get 50.</h2>
             <p className="text-gray-300 mb-8 max-w-md text-sm leading-relaxed">
                Share your unique code. Once your friend completes their first mock interview, you'll instantly unlock premium API credits.
             </p>

             <div className="bg-white/10 border border-white/20 rounded-xl p-2 flex items-center justify-between backdrop-blur-md max-w-lg">
                <div className="px-4 font-mono text-sm tracking-wider w-full truncate text-white">{inviteLink}</div>
                <button 
                  onClick={handleCopy}
                  className="px-6 py-2.5 bg-white text-gray-300 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
             </div>
          </div>

          {/* Stats Column */}
          <div className="grid grid-rows-2 gap-6">
             <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-gray-300 dark:text-zinc-500 tracking-widest mb-1">Total Earned Credits</span>
                <span className="text-4xl font-black text-gray-900 dark:text-zinc-100 font-mono">100</span>
             </div>
             <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-gray-300 dark:text-zinc-500 tracking-widest mb-1">Friends Joined</span>
                <span className="text-4xl font-black text-gray-900 dark:text-zinc-100 font-mono">2<span className="text-xl text-gray-300 dark:text-zinc-600 ml-1">/ 10</span></span>
             </div>
          </div>

       </div>

       {/* History Table */}
       <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden transition-colors flex-1">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-zinc-800 transition-colors flex items-center justify-between">
             <h3 className="font-bold text-gray-900 dark:text-zinc-100">Referral History</h3>
             <span className="text-xs text-gray-300 dark:text-zinc-500 font-medium">Auto-updates every 24h</span>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/50 dark:bg-zinc-950/50 text-gray-300 dark:text-zinc-500 font-semibold tracking-widest uppercase text-[10px] transition-colors">
                   <tr>
                      <th className="px-6 py-4">Referred User</th>
                      <th className="px-6 py-4">Date Sent</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Reward</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50 transition-colors">
                   {REFERRAL_HISTORY.map(ref => (
                      <tr key={ref.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/20 transition-colors group">
                         <td className="px-6 py-4 text-gray-900 dark:text-zinc-200 font-medium">{ref.email}</td>
                         <td className="px-6 py-4 text-gray-300 dark:text-zinc-500 font-mono">{ref.date}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                               ref.status === 'Joined' 
                                 ? 'bg-yellow-400 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-400/20' 
                                 : 'bg-yellow-400 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-400/20'
                            }`}>
                               {ref.status}
                            </span>
                         </td>
                         <td className={`px-6 py-4 text-right font-bold font-mono ${
                            ref.reward.startsWith('+') ? 'text-yellow-400 dark:text-yellow-400' : 'text-gray-300 dark:text-zinc-600'
                         }`}>
                            {ref.reward}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

    </div>
  );
}

export default Referrals;
