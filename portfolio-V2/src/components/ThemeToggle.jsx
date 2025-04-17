import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="theme-toggle">
      <span className="toggle-icon">☀️</span>
      <div className="animation-toggle-wrapper">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
        <div className="animation-toggle-tooltip">
          {darkMode ? "Mode clair" : "Mode sombre"}
        </div>
      </div>
      <span className="toggle-icon">🌙</span>
    </div>
  );
};

export default ThemeToggle;