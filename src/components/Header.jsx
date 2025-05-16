import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import useTheme from '../hooks/useTheme';

function Header() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Empêcher le défilement du body quand le menu mobile est ouvert
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
  }, [mobileMenuOpen]);
  
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
          id="mobile-menu"
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