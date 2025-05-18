import React, { createContext, useState, useEffect } from 'react';

// Crée le contexte - mais n'est pas exporté directement ici
const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {}
});

// Seul le Provider est exporté comme export par défaut
export default function ThemeProvider({ children }) {
  // Initialiser avec localStorage et préférences du système
  const [darkMode, setDarkMode] = useState(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    return savedTheme === 'dark' || (savedTheme === null && prefersDarkMode);
  });

  // Met à jour le DOM et localStorage quand le thème change
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

// Exporte le contexte comme export nommé
export { ThemeContext };