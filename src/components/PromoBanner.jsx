import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Clock, Sparkles } from 'lucide-react';

const PromoBanner = () => {
  const { promoBanner } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Handle Entrance Animation
  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('promo_dismissed');
    if (!hasDismissed && promoBanner.isVisible) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [promoBanner.isVisible]);

  // Live Mathematical Countdown Logic
  useEffect(() => {
    if (!isVisible || !promoBanner.endDate || !promoBanner.isVisible) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(promoBanner.endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, promoBanner.endDate, promoBanner.isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  if (!isVisible || !promoBanner.isVisible) return null;

  return (
    <div className="fixed top-[76px] left-0 w-full z-40 bg-gradient-to-r from-neutral-950 via-amber-950/20 to-neutral-950 border-b border-amber-900/30 overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 pr-10 md:pr-4 py-2.5 md:py-3 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-6 relative">
        <button 
          onClick={handleDismiss}
          className="absolute right-2 md:right-4 top-2 md:top-1/2 md:-translate-y-1/2 text-amber-500/60 hover:text-amber-400 p-1 hover:bg-amber-500/10 rounded-full transition-all"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-amber-500 animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-amber-400 uppercase">
            {promoBanner.title}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] md:text-xs text-neutral-300">
          <span className="hidden md:inline tracking-wide">{promoBanner.subtitle}</span>
          <div className="flex items-center gap-1.5 bg-neutral-950/60 px-2 py-1 rounded border border-amber-900/40 text-amber-500 font-mono shadow-inner">
            <Clock size={12} className="text-amber-600" />
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span className="w-4 text-center">{timeLeft.seconds}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
