import React, { useEffect, useState, useRef } from 'react';
import '../styles/Loader.css';

function Loader({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exploding, setExploding] = useState(false);
  const [ultraExplosion, setUltraExplosion] = useState(false);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  const phases = [
    "Initialisation du portfolio...",
    "Chargement des compétences...",
    "Préparation des projets...",
    "Finalisation..."
  ];

  // Gérer le mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const duration = 3800; // Durée totale en ms
    const interval = 20; // Intervalle de mise à jour en ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);
      
      // Mise à jour de la phase active
      const phaseIndex = Math.min(
        phases.length - 1, 
        Math.floor((newProgress / 100) * phases.length)
      );
      setActivePhase(phaseIndex);

      // Quand on atteint 100%
      if (newProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          // Première phase d'explosion
          setExploding(true);
          
          // Seconde phase d'explosion (encore plus intense)
          setTimeout(() => {
            setUltraExplosion(true);
            
            // Fondu vers le site
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => {
                if (onFinished) onFinished();
              }, 800);
            }, 400);
          }, 300);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onFinished, phases.length]);

  return (
    <div 
      ref={containerRef}
      className={`custom-loader ${fadeOut ? 'fade-out' : ''} ${exploding ? 'exploding' : ''} ${ultraExplosion ? 'ultra-explosion' : ''}`}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      }}
    >
      <div className="gradient-background"></div>
      
      {/* Éléments flottants élégants */}
      <div className="floating-elements">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="floating-circle"
            style={{
              '--circle-x': `${Math.random() * 80 + 10}%`,
              '--circle-y': `${Math.random() * 80 + 10}%`,
              '--circle-size': `${Math.random() * 60 + 40}px`,
              '--circle-opacity': `${Math.random() * 0.15 + 0.05}`,
              '--circle-drift-x': `${Math.random() * 40 - 20}px`,
              '--circle-drift-y': `${Math.random() * 40 - 20}px`,
              '--circle-duration': `${Math.random() * 10 + 15}s`
            }}
          ></div>
        ))}
        
        <div className="code-lines">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="code-line"
              style={{
                '--line-width': `${Math.random() * 120 + 80}px`,
                '--line-left': `${Math.random() * 80 + 10}%`,
                '--line-top': `${Math.random() * 80 + 10}%`,
                '--line-opacity': `${Math.random() * 0.15 + 0.05}`,
                '--line-duration': `${Math.random() * 5 + 5}s`,
                '--line-delay': `${Math.random() * 5}s`,
                '--line-rotate': `${Math.random() * 360}deg`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Flash d'explosion éblouissant */}
      <div className="explosion-flash"></div>
      
      {/* Noyau d'explosion */}
      <div className="explosion-core"></div>
      
      {/* Vagues d'explosion */}
      <div className="shockwaves-container">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="shockwave"
            style={{ '--wave-delay': `${i * 0.05}s` }}
          ></div>
        ))}
      </div>
      
      {/* Particules d'explosion */}
      <div className="particles-container">
        {[...Array(250)].map((_, i) => (
          <div 
            key={i} 
            className="explosion-particle"
            style={{
              '--angle': `${Math.random() * 360}deg`,
              '--distance': `${Math.random() * 100 + 50}vh`,
              '--size': `${Math.random() * 30 + 5}px`,
              '--delay': `${Math.random() * 0.3}s`,
              '--duration': `${Math.random() * 1 + 0.7}s`,
              '--rotation': `${Math.random() * 1080 - 540}deg`
            }}
          ></div>
        ))}
      </div>
      
      {/* Rayons lumineux massifs */}
      <div className="rays-container">
        {[...Array(36)].map((_, i) => (
          <div 
            key={i}
            className="explosion-ray"
            style={{
              '--ray-angle': `${i * 10}deg`,
              '--ray-delay': `${Math.random() * 0.2}s`,
              '--ray-opacity': `${Math.random() * 0.5 + 0.5}`,
              '--ray-width': `${Math.random() * 20 + 5}px`,
              '--ray-glow': `${Math.random() * 30 + 20}px`
            }}
          ></div>
        ))}
      </div>
      
      <div className="loader-content">
        <div className="logo-container">
          <div className="logo-text">
            <span>JB</span>
          </div>
        </div>
        
        <div className="loader-text">
          <h1>Bienvenue sur mon Portfolio</h1>
          <p>{phases[activePhase]}</p>
        </div>
        
        <div className="progress-container" ref={progressBarRef}>
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          >
            <div className="progress-glow"></div>
          </div>
          <div className="progress-bar-text">{progress}%</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;