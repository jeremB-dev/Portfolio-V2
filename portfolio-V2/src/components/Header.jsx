import React from 'react';
import { NavLink } from 'react-router-dom';
// Importez les contextes nécessaires
import { useAnimation } from './AnimationContext';
import { useTheme } from './ThemeContext';

function Header() {
  // Récupérez les valeurs et fonctions des contextes
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-container">
            <div className="logo-perso">
              <img src="/assets/logo-perso/logo-perso.webp" alt="Logo JB" className="logo-perso" width="80" height="80" />
            </div>
            <h1>Jérémy Brunel</h1>
          </div>
          <nav className="header-nav">
            <ul>
              <li><NavLink to="/technologies" className={({isActive}) => isActive ? "active" : ""}>Technologies</NavLink></li>
              <li><NavLink to="/projects" className={({isActive}) => isActive ? "active" : ""}>Projets</NavLink></li>
              <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
            </ul>
          </nav>
          {/* Conteneur pour les deux switches */}
          <div className="switches-container">
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
                <span className="toggle-label"></span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="title-page">
        <h1>Développeur Intégrateur Web</h1>
      </div>
    </>
  );
}

export default Header;