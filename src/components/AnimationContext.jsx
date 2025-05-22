import React, { createContext, useState, useEffect } from 'react';

// Créer le contexte 
const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {}
});

// Crée le provider
export default function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('animationsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Vérifie les préférences utilisateur pour l'accessibilité
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
  }, []);
  
  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  // Gestion simple de la classe : pause/reprise seulement
  useEffect(() => {
    if (animationsEnabled) {
      document.body.classList.remove('animations-disabled');
    } else {
      document.body.classList.add('animations-disabled');
    }
    
    return () => {
      document.body.classList.remove('animations-disabled');
    };
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

export { AnimationContext };