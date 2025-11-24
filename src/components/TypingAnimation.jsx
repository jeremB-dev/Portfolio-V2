import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant d'animation typing (machine à écrire)
 * Affiche le texte caractère par caractère avec effet de curseur
 */
function TypingAnimation({ 
  text = "Développeur Full-Stack", 
  speed = 100,
  delay = 500,
  loop = false,
  cursor = true,
  className = ''
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (loop) {
          setIsDeleting(true);
        }
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Écriture
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (!isDeleting && currentIndex === text.length) {
        // Fin de l'écriture
        if (loop) {
          setIsPaused(true);
        }
      } else if (isDeleting && currentIndex > 0) {
        // Suppression
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        // Fin de la suppression, recommencer
        setIsDeleting(false);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, isPaused, text, speed, loop]);

  // Délai initial avant de commencer
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);
    }, delay);
    return () => clearTimeout(initialDelay);
  }, [delay]);

  return (
    <span className={`typing-animation ${className}`}>
      {displayedText}
      {cursor && <span className="typing-cursor">|</span>}
    </span>
  );
}

TypingAnimation.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
  delay: PropTypes.number,
  loop: PropTypes.bool,
  cursor: PropTypes.bool,
  className: PropTypes.string
};

export default TypingAnimation;
