import { useState } from "react";

function ResumeAnalyzer() {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setupFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const setupFile = (uploadedFile) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert("Resume analyzed! This is a placeholder feature. Your profile has been updated.");
      setFile(null); 
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300 relative">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-yellow-400 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-400 dark:border-yellow-400/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-4 tracking-tight">AI Resume Analyzer</h1>
        <p className="text-gray-300 dark:text-zinc-400 text-lg">
          Upload your resume to get instant feedback on ATS compatibility, keyword optimization, and tailored technical questions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        {isAnalyzing ? (
           <div className="bg-white dark:bg-zinc-900/50 border border-yellow-400 dark:border-yellow-400/30 rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(16,185,129,0.05)] dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
             <div className="relative w-24 h-24 mb-6">
                <svg className="animate-spin w-full h-full text-gray-200 dark:text-zinc-800" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75 text-yellow-400" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <svg className="w-8 h-8 text-yellow-400 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
             </div>
             <h3 className="text-xl font-bold text-yellow-400 dark:text-yellow-400 mb-2">Analyzing Document...</h3>
             <p className="text-gray-300 dark:text-zinc-500 font-mono text-sm">Extracting entities against FAANG benchmarks.</p>
           </div>
        ) : (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`transition-all duration-300 border-2 border-dashed rounded-2xl p-12 md:p-20 flex flex-col items-center justify-center text-center group cursor-pointer ${
              isHovering 
                ? "border-yellow-400 bg-yellow-400 shadow-[0_0_30px_rgba(16,185,129,0.1)] dark:bg-yellow-400/5 dark:shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.02]" 
                : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 hover:border-yellow-400 dark:hover:border-yellow-400/50 hover:bg-gray-50 dark:hover:bg-zinc-900/80"
            }`}
          >
            <input 
              type="file" 
              id="resume-upload" 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <label htmlFor="resume-upload" className="w-full flex flex-col items-center cursor-pointer">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${isHovering ? 'bg-yellow-400 text-yellow-400 dark:bg-yellow-400/20 dark:text-yellow-400' : 'bg-gray-100 text-gray-300 dark:bg-zinc-800 dark:text-zinc-500 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 group-hover:bg-gray-200 dark:group-hover:bg-zinc-800/80'}`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-3">Drag and drop your resume</h3>
              <p className="text-gray-300 dark:text-zinc-500 mb-8">PDF, DOC, or DOCX up to 5MB</p>
              
              <div className="px-6 py-3 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 font-medium rounded-lg transition-colors border border-gray-300 dark:border-zinc-700 shadow-sm">
                Browse Files
              </div>
            </label>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-6 rounded-xl flex items-start gap-4 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-500 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-sm mb-1">Upload Resume</h4>
              <p className="text-xs text-gray-300 dark:text-zinc-500">Securely parsing your experience.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-6 rounded-xl flex items-start gap-4 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-500 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-sm mb-1">AI Matching</h4>
              <p className="text-xs text-gray-300 dark:text-zinc-500">Cross-referencing industry standards.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-6 rounded-xl flex items-start gap-4 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-500 dark:bg-yellow-400/10 text-yellow-400 dark:text-yellow-400 flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-sm mb-1">Tailored Interviews</h4>
              <p className="text-xs text-gray-300 dark:text-zinc-500">Practice questions generated just for you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
