import React, { useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, isTablet } = useWindowSize();
  
  // Ne montrer le bouton que sur mobile et tablette
  const shouldShowButton = isMobile || isTablet;
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300 && shouldShowButton) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Vérifie l'état initial
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [shouldShowButton]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Si on n'est pas sur mobile ou tablette, ne pas rendre le bouton du tout
  if (!shouldShowButton) {
    return null;
  }
  
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