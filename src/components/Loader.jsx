import React, { useEffect, useState, useRef } from 'react';
import '../styles/animations/loader.css';

// Phases en dehors du composant pour éviter les re-renders
const LOADING_PHASES = [
  "Initialisation du portfolio...",
  "Chargement des compétences...",
  "Préparation des projets...",
  "Mise en place du formulaire...",
  "Finalisation..."
];

function Loader({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exploding, setExploding] = useState(false);
  const [ultraExplosion, setUltraExplosion] = useState(false);
  const [logoIntensify, setLogoIntensify] = useState(false);
  const [logoDescending, setLogoDescending] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Références pour contrôler l'état du loader
  const timerRef = useRef(null);
  const onFinishedRef = useRef(onFinished);

  // Met à jour la référence quand onFinished change
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  // Préchargement du logo
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.onload = () => setLogoLoaded(true);
    preloadImage.onerror = () => setLogoLoaded(true);
    preloadImage.src = "/assets/logo-perso/logo-perso.webp";
  }, []);

  // Bloque le scroll au montage
  useEffect(() => {
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      height: document.body.style.height
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100vh';

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

  // Démarre le chargement immédiatement
  useEffect(() => {
    const duration = 2800;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    timerRef.current = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);
      
      const phaseIndex = Math.min(
        LOADING_PHASES.length - 1, 
        Math.floor((newProgress / 100) * LOADING_PHASES.length)
      );
      setActivePhase(phaseIndex);
      
      // Intensification du logo à 80%
      if (newProgress >= 80) {
        setLogoIntensify(true);
      }

      // Fin du chargement
      if (newProgress === 100) {
        clearInterval(timerRef.current);
        
        // Séquence d'explosion
        setTimeout(() => {
          setLogoDescending(true);
          
          setTimeout(() => {
            setExploding(true);
            setTimeout(() => {
              setUltraExplosion(true);
              setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                  // Restaure le scroll
                  document.body.style.overflow = '';
                  document.body.style.position = '';
                  document.body.style.width = '';
                  document.body.style.height = '';
                  
                  if (onFinishedRef.current) onFinishedRef.current();
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
  }, []); // Démarre une seule fois au montage

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
        />
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
        />
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
      <div className="gradient-background" />
      
      {/* Éléments flottants */}
      <div className="floating-elements">
        {renderFloatingElements()}
        
        <div className="code-lines">
          {renderCodeLines()}
        </div>
      </div>
      
      {/* Éléments d'explosion */}
      <div className="explosion-flash" />
      <div className="explosion-core" />
      
      {/* Vagues d'explosion */}
      <div className="shockwaves-container">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="shockwave"
            style={{ '--wave-delay': `${i * 0.04}s`, '--wave-index': i }}
          />
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
          />
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
          />
        ))}
      </div>
      
      <div className="loader-content">
        <div className="logo-container">
          <div className={`logo-img ${logoDescending ? 'logo-descending' : ''} ${logoIntensify ? 'logo-intensify' : ''} ${logoLoaded ? 'logo-loaded' : 'logo-loading'}`}>
            {logoLoaded ? (
              <img 
                src="/assets/logo-perso/logo-perso.webp" 
                alt="Logo JB" 
                width="180" 
                height="180"
              />
            ) : (
              <div className="logo-placeholder">
                <div className="logo-skeleton" />
              </div>
            )}
          </div>
        </div>
        
        <div className="loader-text">
          <h1>Bienvenue sur mon Portfolio</h1>
          <p>{LOADING_PHASES[activePhase]}</p>
        </div>
        
        <div className="progress-container" ref={progressBarRef}>
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          >
            <div className="progress-glow" />
          </div>
          <div className="progress-bar-text">{progress}%</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;