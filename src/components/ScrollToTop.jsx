import React, { useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isDesktop } = useWindowSize();
  
  const shouldShowButton = !isDesktop;
  
  useEffect(() => {
    if (!shouldShowButton) return;
    
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [shouldShowButton]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (!shouldShowButton) return null;
  
  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}

export default ScrollToTop;