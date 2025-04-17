import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAnimation } from './AnimationContext';
import { useTheme } from './ThemeContext';

function SimpleNav() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="simple-nav">
      <div className="nav-logo">
        <img src="/assets/logo-perso/logo-perso.webp" alt="Logo JB" className="logo-perso" width="80" height="80" />
      </div>
      <ul className="nav-links">
        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Accueil</Link></li>
        <li><Link to="/technologies" className={isActive('/technologies') ? 'active' : ''}>Technologies</Link></li>
        <li><Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projets</Link></li>
        <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
      </ul>

      <div className="switches-container">
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
            <span className="toggle-label">{darkMode ? "Mode Clair" : "Mode Sombre"}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SimpleNav;