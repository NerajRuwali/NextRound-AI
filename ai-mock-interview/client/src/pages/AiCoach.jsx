import { useState, useRef, useEffect } from "react";

function AiCoach() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! I'm your AI technical coach. You can ask me to review your code complexity, clarify system design concepts, or give hints for algorithmic problems. How can we accelerate your prep today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
       const responses = [
          "That's a great question! For a distributed cache, you'd typically want to use Consistent Hashing to minimize key redistribution when adding or removing nodes.",
          "Looking at that approach, your time complexity is O(N^2). Have you considered using a Hash Map to trade space for time and bring it down to O(N)?",
          "In behavioral interviews, always remember the STAR framework: Situation, Task, Action, Result. Focus heavily on the 'Action' part to showcase your specific contributions.",
          "I can help you review that! For React performance, ensure you're using React.memo for heavy components and useCallback for functions passed as props."
       ];
       const randomResponse = responses[Math.floor(Math.random() * responses.length)];
       setMessages(prev => [...prev, { role: "system", content: randomResponse }]);
       setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden transition-colors animate-in fade-in duration-300">
       
       <div className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 flex items-center px-6 transition-colors shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-500 dark:bg-yellow-400/20 text-yellow-400 dark:text-yellow-400 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
             </div>
             <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-100">AI Coach</h2>
                <div className="text-[10px] text-yellow-400 font-medium flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span> Online
                </div>
             </div>
          </div>
       </div>

       <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-zinc-950/50 transition-colors">
          {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'system' && (
                   <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-bold self-end mb-1 mr-3 shrink-0 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                )}
                
                <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                   msg.role === 'user' 
                     ? 'bg-yellow-400 dark:bg-yellow-400 text-black font-bold rounded-br-sm' 
                     : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-300 rounded-bl-sm transition-colors'
                }`}>
                   {msg.content}
                </div>
             </div>
          ))}

          {isTyping && (
             <div className="flex justify-start">
                <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-bold self-end mb-1 mr-3 shrink-0 shadow-sm">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="px-5 py-4 rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-1.5 transition-colors">
                   <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          )}
       </div>

       <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 transition-colors">
          <form onSubmit={handleSend} className="relative flex items-center">
             <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message your AI Coach..."
                className="w-full pl-5 pr-14 py-3.5 bg-gray-100 dark:bg-zinc-950 border border-transparent focus:border-gray-500 dark:focus:border-yellow-400/50 focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-gray-900 dark:text-zinc-100 placeholder-gray-500 dark:placeholder-zinc-600 focus:outline-none transition-all text-sm"
             />
             <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`absolute right-2 p-2 rounded-lg transition-colors ${
                   !input.trim() || isTyping 
                     ? 'text-gray-300 dark:text-zinc-600 cursor-not-allowed' 
                     : 'bg-yellow-400 text-black font-bold hover:bg-gray-500 shadow-md'
                }`}
             >
                <svg className="w-4 h-4 translate-x-[1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
             </button>
          </form>
          <div className="text-center mt-3 text-[10px] text-gray-300 dark:text-zinc-600 uppercase tracking-widest font-bold">
             AI Mentor relies on machine learning models. Verify complex logic.
          </div>
       </div>

    </div>
  );
}

export default AiCoach;
