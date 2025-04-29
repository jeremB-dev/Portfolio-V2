import React, { createContext, useState, useEffect, useContext } from 'react';

// Crée le contexte
const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {}
});

// Le Provider
export default function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

// Exporter le contexte
export { AnimationContext };

// Ajouter cette fonction utilitaire pour utiliser le contexte
export const useAnimation = () => useContext(AnimationContext);