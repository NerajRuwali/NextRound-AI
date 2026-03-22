import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const response = await axios.post(`http://localhost:8000${endpoint}`, payload);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
      
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-zinc-950 font-sans transition-colors">
      
      {/* Left Pane - Branding */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden text-zinc-50 border-r border-zinc-800">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              AI
            </div>
            <span className="text-2xl font-bold tracking-tight">NextRound AI</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Master your technical interviews with precision.
          </h1>
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            Practice in a hyper-realistic coding environment. Get instant feedback on your logic, syntax, and algorithmic approach.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-950 shrink-0"></div>
             <div className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-zinc-950 shrink-0"></div>
             <div className="w-10 h-10 rounded-full bg-zinc-600 border-2 border-zinc-950 shrink-0"></div>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Join 10,000+ developers landing top engineering roles.</p>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-zinc-950 transition-colors">
        <div className="w-full max-w-md animate-in fade-in duration-500">
          
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              AI
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">NextRound AI</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-gray-500 dark:text-zinc-400">
              {isLogin ? "Enter your credentials to access your session." : "Start your journey to interview mastery."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="developer@example.com"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-md dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] ${loading ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Authenticating...
                  </span>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-zinc-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={handleToggle}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;