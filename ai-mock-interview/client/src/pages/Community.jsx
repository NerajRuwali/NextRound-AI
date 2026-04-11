import { useState } from "react";

const MOCK_POSTS = [
  { id: 1, author: "Alice Chen", role: "Frontend Engineer", avatar: "A", time: "2h ago", title: "How to effectively explain React Fiber architecture in a Senior interview?", tags: ["React", "System Design"], upvotes: 124, comments: 32 },
  { id: 2, author: "David Wallace", role: "Backend Developer", avatar: "D", time: "5h ago", title: "My experience interviewing at Stripe – The API design round was brutal", tags: ["Interview Experience", "API Design"], upvotes: 389, comments: 89 },
  { id: 3, author: "Priya Patel", role: "Machine Learning Engineer", avatar: "P", time: "1d ago", title: "Best resources for mastering dynamic programming patterns?", tags: ["Algorithms", "DP"], upvotes: 45, comments: 12 }
];

const TRENDING_TOPICS = ["System Design", "FAANG Prep", "Behavioral", "React", "Rust"];

function Community() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="mb-10 lg:flex items-end justify-between border-b border-gray-200 dark:border-zinc-800 pb-6 transition-colors">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">Developer Community</h1>
            <p className="text-gray-300 dark:text-zinc-500">Discuss interview strategies, share experiences, and learn from peers.</p>
         </div>
         <div className="mt-4 lg:mt-0 flex items-center gap-4">
            <div className="flex -space-x-3">
               <div className="w-8 h-8 rounded-full bg-gray-500 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[10px] font-bold text-gray-300 dark:text-zinc-400 transition-colors">J</div>
               <div className="w-8 h-8 rounded-full bg-yellow-400 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[10px] font-bold text-yellow-400 dark:text-zinc-400 transition-colors">M</div>
               <div className="w-8 h-8 rounded-full bg-yellow-400 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[10px] font-bold text-yellow-400 dark:text-zinc-400 transition-colors">S</div>
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-zinc-400">12,304 <span className="text-gray-300 dark:text-zinc-600">Online</span></div>
         </div>
       </div>

       <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="lg:w-2/3 flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-lg transition-colors overflow-x-auto">
                   <button onClick={() => setActiveTab("feed")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${activeTab === 'feed' ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm' : 'text-gray-300 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'}`}>General Feed</button>
                   <button onClick={() => setActiveTab("experiences")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${activeTab === 'experiences' ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm' : 'text-gray-300 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'}`}>Interview Experiences</button>
                   <button onClick={() => setActiveTab("questions")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${activeTab === 'questions' ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm' : 'text-gray-300 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'}`}>Q&A</button>
                </div>
                <button className="hidden sm:flex px-4 py-2 bg-yellow-400 hover:bg-gray-500 text-black font-bold text-sm font-medium rounded-lg shadow-sm transition-all gap-2 items-center">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                   New Post
                </button>
             </div>

             <div className="flex flex-col gap-4">
                {MOCK_POSTS.map(post => (
                   <div key={post.id} className="bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 transition-colors group cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-gray-300 dark:text-zinc-400 group-hover:bg-gray-500 dark:group-hover:bg-yellow-400/10 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 transition-colors">
                               {post.avatar}
                            </div>
                            <div>
                               <div className="font-semibold text-sm text-gray-900 dark:text-zinc-200">{post.author}</div>
                               <div className="text-[10px] text-gray-300 dark:text-zinc-500 font-mono">{post.role}</div>
                            </div>
                         </div>
                         <div className="text-xs text-gray-300 dark:text-zinc-600">{post.time}</div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100 mb-3 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 transition-colors leading-snug">
                         {post.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                         {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-400 transition-colors">
                               {tag}
                            </span>
                         ))}
                      </div>
                      <div className="flex items-center gap-6 border-t border-gray-100 dark:border-zinc-800/50 pt-4 mt-4 transition-colors">
                         <div className="flex items-center gap-1.5 text-gray-300 dark:text-zinc-400 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                            <span className="text-sm font-semibold">{post.upvotes}</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-gray-300 dark:text-zinc-400 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            <span className="text-sm font-semibold">{post.comments} Responses</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">
             {/* Trending Topics */}
             <div className="bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors">
                <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-widest mb-4">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                   {TRENDING_TOPICS.map((topic, i) => (
                      <span key={topic} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                         #{topic}
                      </span>
                   ))}
                </div>
             </div>

             {/* Top Contributors */}
             <div className="bg-black border border-yellow-400 text-yellow-400 dark:from-yellow-400/10 dark:to-yellow-400/5 border border-gray-500 dark:border-yellow-400/20 rounded-2xl p-6 shadow-sm transition-colors">
                <h3 className="text-sm font-bold text-gray-300 dark:text-yellow-400 uppercase tracking-widest mb-4">Weekly Leaderboard</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-400 dark:bg-yellow-400/20 text-yellow-400 dark:text-yellow-400 flex items-center justify-center text-xs font-bold border border-yellow-400 dark:border-yellow-400/30">1</div>
                         <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">Sarah Jenkins</span>
                      </div>
                      <span className="text-xs font-mono text-yellow-400 dark:text-yellow-400">842 pts</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 flex items-center justify-center text-xs font-bold border border-gray-300 dark:border-zinc-700">2</div>
                         <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">Alex Rivera</span>
                      </div>
                      <span className="text-xs font-mono text-yellow-400 dark:text-yellow-400">610 pts</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold border border-orange-200 dark:border-orange-500/30">3</div>
                         <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">Wei Zhang</span>
                      </div>
                      <span className="text-xs font-mono text-yellow-400 dark:text-yellow-400">455 pts</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

export default Community;
