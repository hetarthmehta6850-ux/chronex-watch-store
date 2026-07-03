import { useEffect } from 'react';

const useScrollReveal = (options = {}) => {
  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          
          // Stop observing once visible if we want it to animate only once
          if (entry.target.hasAttribute('data-animate-once')) {
            observer.unobserve(entry.target);
          }
        } else {
          // If we want the animation to reverse when scrolling away
          if (!entry.target.hasAttribute('data-animate-once')) {
            entry.target.classList.remove('animate-visible');
          }
        }
      });
    }, defaultOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [options]);
};

export default useScrollReveal;
