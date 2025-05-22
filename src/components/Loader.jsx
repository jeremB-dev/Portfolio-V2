import React, { useEffect, useState, useRef } from 'react';
import '../styles/animations/loader.css';

function Loader({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exploding, setExploding] = useState(false);
  const [ultraExplosion, setUltraExplosion] = useState(false);
  const [logoIntensify, setLogoIntensify] = useState(false);
  const [logoDescending, setLogoDescending] = useState(false);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Référence pour éviter le redémarrage du loader
  const timerRef = useRef(null);
  const loadingCompleteRef = useRef(false);

  const phases = [
    "Initialisation du portfolio...",
    "Chargement des compétences...",
    "Préparation des projets...",
    "Mise en place du formulaire...",
    "Finalisation..."
  ];

  // Bloque le scroll au montage du composant
  useEffect(() => {
    // Sauvegarde les styles originaux
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      height: document.body.style.height
    };

    // Bloque le scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100vh';

    // Nettoye au démontage
    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.width = originalStyle.width;
      document.body.style.height = originalStyle.height;
    };
  }, []);

  // Gère le mouvement de la souris
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

  // Effet de chargement principal
  useEffect(() => {
    // Si le chargement est déjà terminé, ne pas redémarrer
    if (loadingCompleteRef.current) return;
    
    const duration = 2800;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    timerRef.current = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);
      
      // Mise à jour de la phase active
      const phaseIndex = Math.min(
        phases.length - 1, 
        Math.floor((newProgress / 100) * phases.length)
      );
      setActivePhase(phaseIndex);
      
      // Intensifie l'éclairage du logo à partir de 80%
      if (newProgress >= 80 && !logoIntensify) {
        setLogoIntensify(true);
      }

      // Quand on atteint 100%
      if (newProgress === 100) {
        clearInterval(timerRef.current);
        loadingCompleteRef.current = true;
        
        setTimeout(() => {
          // Animation de grossissement du logo
          setLogoDescending(true);
          
          // Début de l'explosion
          setTimeout(() => {
            setExploding(true);
            setTimeout(() => {
              setUltraExplosion(true);
              setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                  // Restaurer le scroll avant de finir
                  document.body.style.overflow = '';
                  document.body.style.position = '';
                  document.body.style.width = '';
                  document.body.style.height = '';
                  
                  if (onFinished) onFinished();
                }, 600);
              }, 300);
            }, 200);
          }, 150);
        }, 200);
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFinished, phases.length]); // Suppression de logoIntensify pour éviter le redémarrage

  // Génère des éléments flottants optimisés
  const renderFloatingElements = () => (
    <>
      {[...Array(4)].map((_, i) => (
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
            '--circle-duration': `${Math.random() * 8 + 12}s`,
          }}
        ></div>
      ))}
    </>
  );

  const renderCodeLines = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="code-line"
          style={{
            '--line-width': `${Math.random() * 120 + 80}px`,
            '--line-left': `${Math.random() * 80 + 10}%`,
            '--line-top': `${Math.random() * 80 + 10}%`,
            '--line-opacity': `${Math.random() * 0.15 + 0.05}`,
            '--line-duration': `${Math.random() * 4 + 4}s`,
            '--line-delay': `${Math.random() * 4}s`,
            '--line-rotate': `${Math.random() * 360}deg`
          }}
        ></div>
      ))}
    </>
  );

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
      
      {/* Éléments flottants */}
      <div className="floating-elements">
        {renderFloatingElements()}
        
        <div className="code-lines">
          {renderCodeLines()}
        </div>
      </div>
      
      {/* Éléments d'explosion */}
      <div className="explosion-flash"></div>
      <div className="explosion-core"></div>
      
      {/* Vagues d'explosion */}
      <div className="shockwaves-container">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="shockwave"
            style={{ '--wave-delay': `${i * 0.04}s`, '--wave-index': i }}
          ></div>
        ))}
      </div>
      
      {/* Particules d'explosion */}
      <div className="particles-container">
        {[...Array(150)].map((_, i) => (
          <div 
            key={i} 
            className="explosion-particle"
            style={{
              '--angle': `${Math.random() * 360}deg`,
              '--distance': `${Math.random() * 100 + 50}vh`,
              '--size': `${Math.random() * 30 + 5}px`,
              '--delay': `${Math.random() * 0.2}s`,
              '--duration': `${Math.random() * 0.8 + 0.5}s`,
              '--rotation': `${Math.random() * 1080 - 540}deg`
            }}
          ></div>
        ))}
      </div>
      
      {/* Rayons lumineux */}
      <div className="rays-container">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i}
            className="explosion-ray"
            style={{
              '--ray-angle': `${i * 15}deg`,
              '--ray-delay': `${Math.random() * 0.15}s`,
              '--ray-opacity': `${Math.random() * 0.5 + 0.5}`,
              '--ray-width': `${Math.random() * 20 + 5}px`,
              '--ray-glow': `${Math.random() * 30 + 20}px`
            }}
          ></div>
        ))}
      </div>
      
      <div className="loader-content">
        <div className="logo-container">
          {/* Logo JB */}
          <div className={`logo-img ${logoDescending ? 'logo-descending' : ''} ${logoIntensify ? 'logo-intensify' : ''}`}>
            <img 
              src="/assets/logo-perso/logo-perso.webp" 
              alt="Logo JB" 
              width="180" 
              height="180"
            />
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