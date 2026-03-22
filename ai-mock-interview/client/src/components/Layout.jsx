import Navbar from "./Navbar";

function Layout({ children, pageTitle }) {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8 border-b border-white/10 pb-4">
           <h1 className="text-3xl font-bold tracking-tight text-white">{pageTitle || "NextRound AI"}</h1>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
