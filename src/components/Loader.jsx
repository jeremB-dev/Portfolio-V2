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

  // Gére le mouvement de la souris
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

  // Effet de chargement principal - exécuté une seule fois
  useEffect(() => {
    // Si le chargement est déjà terminé, ne pas redémarrer
    if (loadingCompleteRef.current) return;
    
    const duration = 3800; // Durée totale en ms
    const interval = 20; // Intervalle de mise à jour en ms
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
        loadingCompleteRef.current = true; // Marquer comme terminé
        
        setTimeout(() => {
          // Animation de grossissement du logo
          setLogoDescending(true);
          
          // Début de l'explosion pendant le grossissement du logo
          setTimeout(() => {
            setExploding(true);
            setTimeout(() => {
              setUltraExplosion(true);
              setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                  if (onFinished) onFinished();
                }, 800);
              }, 400);
            }, 300);
          }, 200);
        }, 300);
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFinished, phases.length]); // Suppression de logoIntensify du tableau de dépendances

  // Génére des éléments flottants et d'explosion
  const renderFloatingElements = () => (
    <>
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
    </>
  );

  const renderCodeLines = () => (
    <>
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
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="shockwave"
            style={{ '--wave-delay': `${i * 0.05}s`, '--wave-index': i }}
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
      
      {/* Rayons lumineux */}
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