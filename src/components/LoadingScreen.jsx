import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random progress increments for realism
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Start fade out after a tiny delay when progress is full
      setTimeout(() => setIsFadingOut(true), 400);
      
      // Tell parent component we're done after fade animation completes
      setTimeout(() => onComplete(), 1200); 
    }
  }, [progress, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Central Logo Area */}
      <div className="relative flex flex-col items-center">
        {/* Subtle glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full"></div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-100 tracking-[0.2em] relative z-10 animate-pulse">
          CHRONEX
        </h1>
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-500 mt-2 mb-10 relative z-10">
          Vadodara
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden relative z-10">
          <div 
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-[10px] text-neutral-500 uppercase tracking-widest relative z-10 overflow-hidden">
          <span className="inline-block relative">
            Curating your luxury experience...
            {/* Shimmer effect over text */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100/50 to-transparent animate-shimmer"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
