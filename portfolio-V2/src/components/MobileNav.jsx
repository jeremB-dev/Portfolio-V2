import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAnimation } from './AnimationContext';
import { useTheme } from './ThemeContext';

function MobileNav() {
  // États et contextes
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Fonction pour basculer le menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Fonction pour fermer le menu mobile (après un clic sur un lien)
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      {/* Overlay qui s'affiche derrière le menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu}></div>
      )}
      
      {/* Conteneur du menu mobile */}
      <div className="mobile-navigation-container">
        {/* Menu hamburger pour mobile */}
        <div className={`menu-hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Menu mobile qui apparaît/disparaît en fonction de l'état */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <img src="/assets/logo-perso/logo-perso.webp" alt="Logo JB" width="40" height="40" />
              <span>Jérémy Brunel</span>
            </div>
            <div className="mobile-close" onClick={closeMobileMenu}>
              <span>×</span>
            </div>
          </div>
          
          <ul className="mobile-nav-links">
            <li><NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Accueil</NavLink></li>
            <li><NavLink to="/technologies" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Technologies</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Projets</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
          </ul>
          
          {/* Conteneur pour les switches dans le menu mobile */}
          <div className="mobile-switches-container">
            {/* Switch pour les animations */}
            <div className="toggle-item">
              <span className="toggle-icon">{animationsEnabled ? "✨" : "🚫"}</span>
              <div className="switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={animationsEnabled}
                    onChange={() => setAnimationsEnabled(!animationsEnabled)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Animations</span>
              </div>
            </div>
          
            {/* Switch pour le thème */}
            <div className="toggle-item">
              <span className="toggle-icon">{darkMode ? "🌙" : "☀️"}</span>
              <div className="switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Thème</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;