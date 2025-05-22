// Mise à jour de Header.jsx avec gestion complète de fermeture

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import useTheme from '../hooks/useTheme';

function Header() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);
  
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
  
  // Gestionnaire pour la touche Échap
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

  // Gestionnaire de clic en dehors du menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        hamburgerRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      // Petite temporisation pour éviter la fermeture immédiate lors de l'ouverture
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [mobileMenuOpen, closeMobileMenu]);

  // Gestionnaire de swipe pour fermer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    let startX = 0;
    let startY = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!startX || !startY) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Swipe vers la droite (pour fermer le menu qui vient de la droite)
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < -minSwipeDistance) {
          closeMobileMenu();
        }
      }
      // Swipe vertical (scroll)
      else if (Math.abs(diffY) > minSwipeDistance) {
        closeMobileMenu();
      }
    };

    const handleTouchEnd = () => {
      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // Fermer lors du redimensionnement (rotation d'écran)
  useEffect(() => {
    const handleResize = () => {
      if (mobileMenuOpen && window.innerWidth >= 768) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen, closeMobileMenu]);
  
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="left-section">
            <div className="logo-perso">
              <img 
                src="/assets/logo-perso/logo-perso.webp" 
                alt="Logo JB" 
                className="logo-perso" 
                width="80" 
                height="80" 
              />
            </div>
            <h1>Jérémy Brunel</h1>
          </div>
          
          <nav className="header-nav">
            <ul>
              <li><NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Accueil</NavLink></li>
              <li><NavLink to="/technologies" className={({isActive}) => isActive ? "active" : ""}>Technologies</NavLink></li>
              <li><NavLink to="/projects" className={({isActive}) => isActive ? "active" : ""}>Projets</NavLink></li>
              <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
            </ul>
          </nav>
          
          <button 
            ref={hamburgerRef}
            className={`menu-hamburger ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div 
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <img src="/assets/logo-perso/logo-perso.webp" alt="Logo JB" width="40" height="40" aria-placeholder='Jérémy Brunel' />
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
      
      {/* Overlay amélioré avec gestion du clic */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-overlay" 
          onClick={closeMobileMenu}
          onTouchStart={closeMobileMenu}
          role="presentation"
          aria-label="Fermer le menu"
        ></div>
      )}
      
      <div className="switches-bar home-only desktop-only">
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
      
      <div className="title-page">
        <h1>Développeur Intégrateur Web</h1>
      </div>
    </>
  );
}

export default Header;