import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, LayoutDashboard, BarChart3, Bot, Menu, X, 
  Map, BookOpen, Code2, MessagesSquare, FileText, Users, Gift, RefreshCw, Award, Trophy, History as HistoryIcon 
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  // Drawer Nav Item Component
  const DrawerLink = ({ to, icon: Icon, label }) => {
     const isActive = location.pathname === to;
     return (
        <Link 
           to={to} 
           onClick={closeDrawer}
           className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-bold' 
                : 'text-gray-300 hover:bg-white/5 hover:text-black font-bold font-medium'
           }`}
        >
           <Icon className="w-5 h-5" />
           <span>{label}</span>
        </Link>
     )
  }

  if (!token) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400 flex items-center justify-center text-yellow-400 shadow-[0_0_15px_rgba(255,204,0,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Bot className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">NextRound <span className="text-yellow-400">AI</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link to="/login" className="text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,204,0,0.3)]">Get Started</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all xl:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-black border border-yellow-400 flex items-center justify-center text-yellow-400 shadow-[0_0_15px_rgba(255,204,0,0.4)] group-hover:scale-105 transition-transform duration-300">
                <Bot className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white hidden sm:block">NextRound <span className="text-yellow-400">AI</span></span>
            </Link>
          </div>

          <div className="hidden xl:flex flex-1 justify-center gap-2">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                location.pathname === '/dashboard' 
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-black font-bold'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>

            <Link 
              to="/performance" 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                location.pathname === '/performance' 
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-black font-bold'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Performance
            </Link>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
            >
              <Menu className="w-4 h-4" /> Explore Tools
            </button>
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-colors border border-white/10"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Slide-out Drawer Component */}
      <AnimatePresence>
         {isDrawerOpen && (
            <>
               {/* Backdrop */}
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeDrawer}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
               />

               {/* Drawer Panel */}
               <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="fixed top-0 left-0 bottom-0 w-80 bg-[#000000] border-r border-white/10 shadow-2xl z-50 flex flex-col overflow-y-auto"
               >
                  <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-10">
                     <span className="font-bold text-lg text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-yellow-400" /> Platform Tools
                     </span>
                     <button onClick={closeDrawer} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="p-4 space-y-6 flex-1">
                     
                     {/* Learn Section */}
                     <div>
                        <h4 className="text-[10px] uppercase font-bold text-gray-300 tracking-widest pl-4 mb-3">Learn</h4>
                        <div className="space-y-1">
                           <DrawerLink to="/learn/path" icon={Map} label="Learning Path" />
                           <DrawerLink to="/learn/dsa" icon={BookOpen} label="DSA Pattern Mastery" />
                        </div>
                     </div>

                     {/* Practice Section */}
                     <div>
                        <h4 className="text-[10px] uppercase font-bold text-gray-300 tracking-widest pl-4 mb-3">Practice</h4>
                        <div className="space-y-1">
                           <DrawerLink to="/practice/code" icon={Code2} label="Code/Design Practice" />
                           <DrawerLink to="/practice/coach" icon={MessagesSquare} label="AI Coach" />
                        </div>
                     </div>

                     {/* Tools Section */}
                     <div>
                        <h4 className="text-[10px] uppercase font-bold text-gray-300 tracking-widest pl-4 mb-3">Auxiliary Engines</h4>
                        <div className="space-y-1">
                           <DrawerLink to="/leaderboard" icon={Trophy} label="Global Leaderboard" />
                           <DrawerLink to="/analytics" icon={BarChart3} label="Global Analytics" />
                           <DrawerLink to="/history" icon={HistoryIcon} label="Session History" />
                           <DrawerLink to="/certificates" icon={Award} label="Certificates Wallet" />
                           <DrawerLink to="/revision-hub" icon={RefreshCw} label="Revision Hub" />
                           <DrawerLink to="/resume-analyzer" icon={FileText} label="Resume Analyzer" />
                           <DrawerLink to="/community" icon={Users} label="Community" />
                           <DrawerLink to="/referrals" icon={Gift} label="Referrals" />
                        </div>
                     </div>

                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
