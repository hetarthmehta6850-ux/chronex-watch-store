import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-full bg-neutral-900/60 backdrop-blur-md border border-neutral-700 hover:border-amber-500/50 text-neutral-400 hover:text-amber-400 shadow-xl transition-all duration-500 ease-in-out group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default ScrollToTop;
