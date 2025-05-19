import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import useTheme from '../hooks/useTheme';

function SimpleNav() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Utilisation de useCallback pour optimiser les performances
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);
  
  // Empêche le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Ajout d'un gestionnaire pour la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // Ajout du gestionnaire de scroll pour fermer le menu
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    // On attache l'écouteur d'événement uniquement si le menu est ouvert
    if (mobileMenuOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen, closeMobileMenu]);
  
  // Détection de l'interaction tactile (swipe) pour les appareils mobiles
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50; // Distance minimale pour considérer qu'il y a eu un swipe
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
      
      // Si l'utilisateur fait un swipe vers le haut ou vers le bas d'une distance significative
      if (Math.abs(touchEndY - touchStartY) > minSwipeDistance && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
    }
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // Fermer le menu lors d'un changement de taille d'écran (ex: rotation de l'appareil)
  useEffect(() => {
    const handleResize = () => {
      if (mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // Fermer le menu si l'utilisateur clique en dehors du menu (même sans l'overlay)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.getElementById('mobile-menu-simple');
      const hamburger = document.querySelector('.menu-hamburger');
      
      if (
        mobileMenuOpen && 
        menu && 
        !menu.contains(e.target) && 
        hamburger && 
        !hamburger.contains(e.target)
      ) {
        closeMobileMenu();
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="left-section">
            <div className="logo-perso">
              <Link to="/">
                <img 
                  src="/assets/logo-perso/logo-perso.webp" 
                  alt="Logo JB" 
                  className="logo-perso" 
                  width="80" 
                  height="80" 
                />
              </Link>
            </div>
            <h1>Jérémy Brunel</h1>
          </div>
          
          <nav className="header-nav">
            <ul>
              <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Accueil</NavLink></li>
              <li><NavLink to="/technologies" className={({isActive}) => isActive ? "active" : ""}>Technologies</NavLink></li>
              <li><NavLink to="/projects" className={({isActive}) => isActive ? "active" : ""}>Projets</NavLink></li>
              <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
            </ul>
          </nav>
          
          <button 
            className={`menu-hamburger ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-simple"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div 
          id="mobile-menu-simple"
          className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <img src="/assets/logo-perso/logo-perso.webp" alt="Logo JB" width="40" height="40" />
              <span>Jérémy Brunel</span>
            </div>
            <button 
              className="mobile-close" 
              onClick={closeMobileMenu}
              aria-label="Fermer le menu"
            >
              <span>×</span>
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li><NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Accueil</NavLink></li>
            <li><NavLink to="/technologies" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Technologies</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Projets</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
          </ul>
          
          <div className="mobile-switches-container">
            <div className="toggle-item">
              <span className="toggle-icon">{animationsEnabled ? "✨" : "🚫"}</span>
              <div className="switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={animationsEnabled}
                    onChange={() => setAnimationsEnabled(!animationsEnabled)}
                    aria-label={`Animations ${animationsEnabled ? 'activées' : 'désactivées'}`}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Animations</span>
              </div>
            </div>
          
            <div className="toggle-item">
              <span className="toggle-icon">{darkMode ? "🌙" : "☀️"}</span>
              <div className="switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    aria-label={`Thème ${darkMode ? 'sombre' : 'clair'}`}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Thème</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-overlay" 
          onClick={closeMobileMenu}
          role="presentation"
        ></div>
      )}   
      <div className="switches-bar simple-nav-switchs desktop-only">
      </div>
    </>
  );
}

export default SimpleNav;