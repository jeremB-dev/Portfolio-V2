import React, { createContext, useState, useEffect, useContext } from 'react';

// Crée le contexte
const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {}
});

// Le Provider
export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Vérifie les préférences système ou localStorage
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  // Met à jour les classes CSS et localStorage quand le thème change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Exports nommés
export { ThemeContext };
export const useTheme = () => useContext(ThemeContext);