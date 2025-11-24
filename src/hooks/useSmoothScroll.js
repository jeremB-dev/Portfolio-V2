import { useEffect } from 'react';

/**
 * Hook personnalisé pour le smooth scroll
 * Ajoute un scroll fluide avec easing personnalisé
 */
export const useSmoothScroll = (duration = 1000) => {
  useEffect(() => {
    // Fonction d'easing personnalisée (ease-in-out cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Fonction de scroll fluide
    const smoothScrollTo = (targetPosition, duration) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Intercepter les clics sur les liens d'ancre
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#') return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = 80; // Offset pour le header fixe
      
      smoothScrollTo(targetPosition - offset, duration);
      
      // Mettre à jour l'URL sans scroll
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [duration]);
};

export default useSmoothScroll;
