import React, { createContext, useState, useEffect } from 'react';

// Créer le contexte 
const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {}
});

// Le Provider
export default function AnimationProvider({ children }) {
  // Initialiser avec localStorage s'il existe, sinon true
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('animationsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Vérifier les préférences utilisateur pour l'accessibilité
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
  }, []);
  
  // Sauvegarder dans localStorage quand la valeur change
  useEffect(() => {
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

// Exporter le contexte
export { AnimationContext };